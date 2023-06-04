import { CertificateController } from './certificate';
import { EmailValidator, AddCertificate, AddCertificateModel, CertificateModel } from './certificate-protocols';
import { MissingParamError, InvalidParamError, ServerError } from '../../errors';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    public isValid(): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeAddCertificate = (): AddCertificate => {
  class AddCertificateStub implements AddCertificate {
    public async add(certificate: AddCertificateModel): Promise<CertificateModel> {
      const fakeCertificate = {
        id: 'validId',
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      };

      return new Promise(resolve => resolve(fakeCertificate));
    }
  }
  return new AddCertificateStub();
};

const makeEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    public isValid(): boolean {
      throw new Error();
    }
  }
  return new EmailValidatorStub();
};

interface SutTypes {
  sut: CertificateController;
  addCertificateStub: AddCertificate;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addCertificateStub = makeAddCertificate();
  const sut = new CertificateController(emailValidatorStub, addCertificateStub);
  return {
    sut,
    emailValidatorStub,
    addCertificateStub
  };
};

describe('Certificate Controller', () => {
  test('Should return 400 if no studentId is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('studentId'));
  });

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        studentId: 'validId',
        activePlan: true
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('studentEmail'));
  });

  test('Should return 400 if no activePlan is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('activePlan'));
  });

  test('Should return 400 if an invalid studentEmail is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        studentId: 'validId',
        studentEmail: 'invalidEmail@mail.com',
        activePlan: true
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('studentEmail'));
  });

  test('Should call EmailValidator with correct studentEmail', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      }
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('validEmail@mail.com');
  });

  // Utiliza Factory makeEmailValidatorWithError que gera uma instância de emailValidatorStub retornando um erro
  test('Should return 500 if EmailValidator throws Factory', async () => {
    const emailValidatorStub = makeEmailValidatorWithError();
    const addCertificateStub = makeAddCertificate();
    const sut = new CertificateController(emailValidatorStub, addCertificateStub);
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  // Utiliza o Jest (jest.spyOn) para criar uma versão mockada da implementação retornando um erro
  test('Should return 500 if EmailValidator throws Jest', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should call AddCertificate with correct values', async () => {
    const { sut, addCertificateStub } = makeSut();
    const addSPy = jest.spyOn(addCertificateStub, 'add');
    const httpRequest = {
      body: {
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      }
    };
    sut.handle(httpRequest);
    expect(addSPy).toHaveBeenCalledWith({
      studentId: 'validId',
      studentEmail: 'validEmail@mail.com',
      activePlan: true
    });
  });

  test('Should return 500 if AddCertificate throws', async () => {
    const { sut, addCertificateStub } = makeSut();
    jest.spyOn(addCertificateStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest = {
      body: {
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 200 if a valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'validId',
      studentId: 'validId',
      studentEmail: 'validEmail@mail.com',
      activePlan: true
    });
  });
});
