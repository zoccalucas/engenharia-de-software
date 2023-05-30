<<<<<<< HEAD
import { CertificateModel } from '../models/certificate';
=======
import { CertificateModel } from "../models/certificate";
>>>>>>> 15815358264206bd5356ea2a695d2927c262b2b0

export interface AddCertificateModel {
  studentId: string;
  studentEmail: string;
  activePlan: boolean;
}

export interface AddCertificate {
  add(certificate: AddCertificateModel): CertificateModel;
}
