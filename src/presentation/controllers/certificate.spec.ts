import { CertificateController } from './certificate';
import { MissingParamError, InvalidParamError, ServerError } from '../errors';
import { EmailValidator } from '../protocols';

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
        studentEmail: 'anyEmail@gmail.com',
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
        studentEmail: 'anyEmail@gmail.com',
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
        studentEmail: 'invalidEmail@gmail.com',
        activePlan: true,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('studentEmail'));
  });

  test('Should call EmailValidator with correct studentEmail', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        studentId: 'anyId',
        studentEmail: 'anyEmail@gmail.com',
        activePlan: true,
      },
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('anyEmail@gmail.com');
  });

  test('Should return 500 if EmailValidator throws', async () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(studentEmail: string): boolean {
        throw new Error();
      }
    }

    const emailValidatorStub = new EmailValidatorStub();
    const sut = new CertificateController(emailValidatorStub);
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        studentId: 'anyId',
        studentEmail: 'anyEmail@gmail.com',
        activePlan: true,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
