import { DbAddCertificate } from '../../data/usecases/add-certificate/db-add-certificate';
import { CertificateMongoRepository } from '../../infra/db/mongodb/certificate-repository/certificate';
import { CertificateController } from '../../presentation/controllers/certificate/certificate';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';

export const makeCertificateController = (): CertificateController => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const certificateMongoRepository = new CertificateMongoRepository();
  const dbAddCertificate = new DbAddCertificate(certificateMongoRepository);
  return new CertificateController(emailValidatorAdapter, dbAddCertificate);
};
