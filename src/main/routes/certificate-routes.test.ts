import request from 'supertest';

import app from '../config/app';

describe('Certificate Routes', () => {
  test('Should return an certificate on success', async () => {
    await request(app)
      .post('/api/certificate')
      .send({
        certificateId: 'anyId',
        studentId: 'anyId',
        studentEmail: 'anyEmail@gmail.com',
        activePlan: true
      })
      .expect(200);
  });
});
