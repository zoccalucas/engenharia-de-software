import { HttpRequest, HttpResponse, Controller, AddCertificate, EmailValidator } from './certificate-protocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, serverError, ok } from '../../helpers/http-helper';

export class CertificateController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addCertificate: AddCertificate;

  constructor(emailValidator: EmailValidator, addCertificate: AddCertificate) {
    this.emailValidator = emailValidator;
    this.addCertificate = addCertificate;
  }

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const certificate = await this.addCertificate.add({
        studentId,
        studentEmail,
        activePlan
      });

      return ok(certificate);
    } catch (error) {
      return serverError();
    }
  }
}
