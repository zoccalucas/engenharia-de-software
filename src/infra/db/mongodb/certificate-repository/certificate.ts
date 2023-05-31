import { AddCertificateRepository } from '../../../../data/protocols/add-certificate-repository';
import { CertificateModel } from '../../../../domain/models/certificate';
import { AddCertificateModel } from '../../../../domain/usecases/add-certificate';

export class CertificateMongoRepository implements AddCertificateRepository {
  public async add(certificateData: AddCertificateModel): Promise<CertificateModel> {
    return new Promise(resolve =>
      resolve({
        id: 'truthyId',
        studentId: 'validId',
        studentEmail: 'validEmail',
        activePlan: true
      })
    );
  }
}
