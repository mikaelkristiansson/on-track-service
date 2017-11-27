import { Router } from 'express';
import { signup, signin, refresh_token } from '../controllers/auth';

const router = Router();

router.route('/sign_up').post(signup);

router.route('/sign_in').post(signin);

router.route('/refresh_token').get(refresh_token);

export default router;
