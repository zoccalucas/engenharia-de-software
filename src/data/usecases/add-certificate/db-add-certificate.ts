import {
  AddCertificate,
  AddCertificateModel,
  CertificateModel,
  AddCertificateRepository
} from './db-add-certificate-protocols';

export class DbAddCertificate implements AddCertificate {
  private readonly addCertificateRepository: AddCertificateRepository;

  constructor(AddCertificateRepository: AddCertificateRepository) {
    this.addCertificateRepository = AddCertificateRepository;
  }

  public async add(certificateData: AddCertificateModel): Promise<CertificateModel> {
    return await this.addCertificateRepository.add(Object.assign({}, certificateData));
  }
}
