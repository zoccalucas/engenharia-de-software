import { HttpRequest, HttpResponse } from '../protocols/http';

export class CertificateController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.studentId) {
      return {
        statusCode: 400,
        body: new Error('Missing param: studentId'),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    }
    return {
      statusCode: 200,
      body: 'Success',
    };
  }
}
