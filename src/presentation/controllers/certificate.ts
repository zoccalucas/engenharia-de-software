import { AddCertificate } from '../../domain/usecases/add-certificate';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { HttpRequest, HttpResponse, Controller } from '../protocols';
import { EmailValidator } from '../protocols/email-validator';

export class CertificateController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addCertificate: AddCertificate;

  constructor(emailValidator: EmailValidator, addCertificate: AddCertificate) {
    this.emailValidator = emailValidator;
    this.addCertificate = addCertificate;
  }

  public handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['studentId', 'studentEmail', 'activePlan'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { studentId, studentEmail, activePlan } = httpRequest.body;
      const isValidStudentEmail = this.emailValidator.isValid(httpRequest.body.studentEmail);

      if (!isValidStudentEmail) {
        return badRequest(new InvalidParamError('studentEmail'));
      }

      this.addCertificate.add({
        studentId,
        studentEmail,
        activePlan
      });
      return {
        statusCode: 200,
        body: 'Success'
      };
    } catch (error) {
      return serverError();
    }
  }
}
