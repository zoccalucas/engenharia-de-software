import env from './config/env';
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.get('/', (req, res) => {
      res.send('Docker is running');
    });

    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
  })
  .catch(console.error);
