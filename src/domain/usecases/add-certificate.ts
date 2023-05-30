import { CertificateModel } from '../models/certificate';

export interface AddCertificateModel {
  studentId: string;
  studentEmail: string;
  activePlan: boolean;
}

export interface AddCertificate {
  add(certificate: AddCertificateModel): Promise<CertificateModel>;
}
