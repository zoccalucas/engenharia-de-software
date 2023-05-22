import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';
import { InvalidParamError } from '../errors/invalid-param-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator';

export class CertificateController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['studentId', 'studentEmail', 'activePlan'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const isValidEmail = this.emailValidator.isValid(httpRequest.body.studentEmail);
    if(!isValidEmail) {
      return badRequest(new InvalidParamError('studentEmail'));
    }

    return {
      statusCode: 200,
      body: 'Success',
    };
  }
}
