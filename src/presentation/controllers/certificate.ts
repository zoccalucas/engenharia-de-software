import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export class CertificateController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['studentId', 'studentEmail', 'activePlan'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    return {
      statusCode: 200,
      body: 'Success',
    };
  }
}
