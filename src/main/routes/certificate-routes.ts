import { Router } from 'express';

import { adaptRoute } from '../adapters/express-route-adapter';
import { makeCertificateController } from '../factories/certificate';

export default (router: Router): void => {
  router.post('/certificate', adaptRoute(makeCertificateController()));
};
