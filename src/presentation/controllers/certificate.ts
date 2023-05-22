import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';

export class CertificateController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.studentId) {
      return {
        statusCode: 400,
        body: new MissingParamError('studentId'),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('studentEmail'),
      };
    }
    return {
      statusCode: 200,
      body: 'Success',
    };
  }
}
