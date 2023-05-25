import { Router } from 'express';

export default (router: Router): void => {
  router.post('/certificate', (req, res) => {
    res.json({ message: 'Certificate created' });
  });
};
