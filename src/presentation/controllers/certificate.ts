export class CertificateController {
  handle(httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: studentId')
    } 
  }
}