export class CertificateController {
  handle(httpRequest: any): any {
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
  }
}
