import { DbAddCertificate } from './db-add-certificate';
import { AddCertificateModel, CertificateModel, AddCertificateRepository } from './db-add-certificate-protocols';

const makeAddCertificateRepository = (): AddCertificateRepository => {
  class AddCertificateRepositoryStub implements AddCertificateRepository {
    public async add(certificateData: AddCertificateModel): Promise<CertificateModel> {
      const fakeCertificate = {
        id: 'validId',
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      };
      return new Promise(resolve => resolve(fakeCertificate));
    }
  }
  return new AddCertificateRepositoryStub();
};

interface SutTypes {
  sut: DbAddCertificate;
  AddCertificateRepositoryStub: AddCertificateRepository;
}

const makeSut = (): SutTypes => {
  const AddCertificateRepositoryStub = makeAddCertificateRepository();
  const sut = new DbAddCertificate(AddCertificateRepositoryStub);
  return { sut, AddCertificateRepositoryStub };
};

describe('DbCertificate UseCase', () => {
  test('Should call AddCertificateRepository with correct values', async () => {
    const { sut, AddCertificateRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(AddCertificateRepositoryStub, 'add');
    const certificateData = {
      studentId: 'validId',
      studentEmail: 'validEmail@mail.com',
      activePlan: true
    };
    await sut.add(certificateData);
    expect(addSpy).toHaveBeenCalledWith(certificateData);
  });

  test('Should return a certificate on success', async () => {
    const { sut } = makeSut();
    const certificateData = {
      studentId: 'validId',
      studentEmail: 'validEmail@mail.com',
      activePlan: true
    };
    const certificate = await sut.add(certificateData);
    expect(certificate).toEqual({
      id: 'validId',
      studentId: 'validId',
      studentEmail: 'validEmail@mail.com',
      activePlan: true
    });
  });
});
