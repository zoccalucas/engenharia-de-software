import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { HttpRequest, HttpResponse, Controller } from '../protocols';
import { EmailValidator } from '../protocols/email-validator';

export class CertificateController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  public handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['certificateId', 'studentId', 'studentEmail', 'activePlan'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isValidStudentEmail = this.emailValidator.isValid(httpRequest.body.studentEmail);

      if (!isValidStudentEmail) {
        return badRequest(new InvalidParamError('studentEmail'));
      }

      return {
        statusCode: 200,
        body: 'Success'
      };
    } catch (error) {
      return serverError();
    }
  }
}
