import { CertificateController } from './certificate';
import { MissingParamError } from '../errors/missing-param-error';

describe('Certificate Controller', () => {
  test('Should return 400 if no studentId is provided', async () => {
    const sut = new CertificateController();

    const httpRequest = {
      body: {
        studentEmail: 'any_email@gmail.com',
        activePlan: true,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('studentId'));
  });

  test('Should return 400 if no email is provided', async () => {
    const sut = new CertificateController();

    const httpRequest = {
      body: {
        studentId: Number,
        activePlan: true,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('studentEmail'));
  });
});
