import app from './config/app';

const PORT = 5050;

app.get('/', (req, res) => {
  res.send('Docker running');
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
