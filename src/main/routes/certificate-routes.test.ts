import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('Certificate Routes', () => {
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
