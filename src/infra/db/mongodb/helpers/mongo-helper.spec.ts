import { MongoHelper as sut } from './mongo-helper';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/database';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(mongoUrl);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect if mongodb is down', async () => {
    let certificateCollection = await sut.getCollection('certificates');
    expect(certificateCollection).toBeTruthy();
    await sut.disconnect();
    certificateCollection = await sut.getCollection('certificates');
    expect(certificateCollection).toBeTruthy();
  });
});
