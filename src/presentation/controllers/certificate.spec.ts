import { CertificateController } from './certificate';
import { MissingParamError } from '../errors/missing-param-error';
import { InvalidParamError } from '../errors/invalid-param-error';
import { EmailValidator } from '../protocols/email-validator';

const makeSut = (): CertificateController => {
  class EmailValidatorStub implements  EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  return new CertificateController(emailValidatorStub);
} 

describe('Certificate Controller', () => {
  test('Should return 400 if no studentId is provided', async () => {
    const sut = makeSut();

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
    const sut = makeSut();

    const httpRequest = {
      body: {
        studentId: 'anyId',
        activePlan: true,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('studentEmail'));
  });

  test('Should return 400 if no activePlan is provided', async () => {
    const sut = makeSut();

    const httpRequest = {
      body: {
        studentId: 'anyId',
        studentEmail: 'any_email@gmail.com',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('activePlan'));
  });

  test('Should return 400 if an invalid studentEmail is provided', async () => {
    const sut = makeSut();

    const httpRequest = {
      body: {
        studentId: 'anyId',
        studentEmail: 'invalid_email@gmail.com',
        activePlan: true,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('studentEmail'));
  });
});
