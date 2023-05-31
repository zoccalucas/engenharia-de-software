import { AddCertificateRepository } from '../../../../data/protocols/add-certificate-repository';
import { CertificateModel } from '../../../../domain/models/certificate';
import { AddCertificateModel } from '../../../../domain/usecases/add-certificate';
import { MongoHelper } from '../helpers/mongo-helper';

export class CertificateMongoRepository implements AddCertificateRepository {
  public async add(certificateData: AddCertificateModel): Promise<CertificateModel> {
    const certificateCollection = MongoHelper.getCollection('certificates');
    const result = await certificateCollection.insertOne(certificateData);
    return MongoHelper.map(result.ops[0]);
  }
}
