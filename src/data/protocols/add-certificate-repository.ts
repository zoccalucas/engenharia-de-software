import { CertificateModel } from '../../domain/models/certificate';
import { AddCertificateModel } from '../../domain/usecases/add-certificate';

export interface AddCertificateRepository {
  add(certificateData: AddCertificateModel): Promise<CertificateModel>;
}
