import { CertificateController } from './certificate';
import { MissingParamError } from '../errors/missing-param-error';
import { InvalidParamError } from '../errors/invalid-param-error';
import { EmailValidator } from '../protocols/email-validator';

interface SutTypes {
  sut: CertificateController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(studentEmail: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new CertificateController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('Certificate Controller', () => {
  test('Should return 400 if no studentId is provided', async () => {
    const { sut } = makeSut();

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
    const { sut } = makeSut();

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
    const { sut } = makeSut();

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
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

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
