import app from './config/app';
import env from './config/env';

app.get('/', (req, res) => {
  res.send('Docker running');
});

app.listen(env.port, () => console.log(`Server running at ${env.port}`));
