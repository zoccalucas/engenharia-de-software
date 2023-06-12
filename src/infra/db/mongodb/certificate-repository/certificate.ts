import { AddCertificateRepository } from '../../../../data/protocols/add-certificate-repository';
import { CertificateModel } from '../../../../domain/models/certificate';
import { AddCertificateModel } from '../../../../domain/usecases/add-certificate';

export class CertificateMongoRepository implements AddCertificateRepository {
  public async add(certificateData: AddCertificateModel): Promise<CertificateModel> {
    return new Promise(resolve =>
      resolve({
        id: '123456',
        studentId: '123',
        studentEmail: 'validEmail@gmail.com',
        activePlan: true
      })
    );
  }
}
