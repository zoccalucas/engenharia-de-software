import { CertificateController } from './certificate';

describe('Certificate Controller', () => {
  test('Should return 400 if no studentId is provided', async () => {
    const sut = new CertificateController();

    const httpRequest = {
      body: {
        studentEmail: 'any_email@gmail.com',
        planoAtivo: true,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: studentId'));
  });

  test('Should return 400 if no email is provided', async () => {
    const sut = new CertificateController();

    const httpRequest = {
      body: {
        studentId: Number,
        planoAtivo: true,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: studentId'));
  });
});
