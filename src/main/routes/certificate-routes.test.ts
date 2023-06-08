import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('Certificate Routes', () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/database';
    await MongoHelper.connect(mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const certificaCollection = await MongoHelper.getCollection('certificates');
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
