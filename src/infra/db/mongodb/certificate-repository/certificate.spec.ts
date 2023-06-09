import { CertificateMongoRepository } from './certificate';
import { MongoHelper } from '../helpers/mongo-helper';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/database';

describe('Certificate Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const certificaCollection = await MongoHelper.getCollection('certificates');
    await certificaCollection.deleteMany({});
  });

  const makeSut = (): CertificateMongoRepository => {
    return new CertificateMongoRepository();
  };

  test('Should return an account on success', async () => {
    const sut = makeSut();
    const certificate = await sut.add({
      studentId: 'validId',
      studentEmail: 'validEmail',
      activePlan: true
    });
    expect(certificate).toBeTruthy();
    expect(certificate.id).toBeTruthy();
    expect(certificate.studentId).toBe('validId');
    expect(certificate.studentEmail).toBe('validEmail');
    expect(certificate.activePlan).toBe(true);
  });
});
