import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('Certificate Routes', () => {
  beforeAll(async () => {
    const mongoURL = process.env.MONGO_URL || 'mongodb://l ocalhost:27017/database';
    await MongoHelper.connect(mongoURL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const certificaCollection = MongoHelper.getCollection('certificates');
    await certificaCollection.deleteMany({});
  });

  test('Should return an certificate on success', async () => {
    await request(app)
      .post('/api/certificate')
      .send({
        studentId: 'validId',
        studentEmail: 'validEmail@mail.com',
        activePlan: true
      })
      .expect(200);
  });
});
