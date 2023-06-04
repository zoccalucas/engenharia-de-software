import { Router } from 'express';

export default (router: Router): void => {
  router.post('/certificate', (req, res) => {
    res.json({
      id: 'validId',
      studentId: 'validId',
      studentEmail: 'validEmail@mail.com',
      activePlan: true
    });
  });
};
