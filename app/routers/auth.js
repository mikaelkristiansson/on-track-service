import express, { Router } from 'express';
import { signup, signin, refresh_token } from '../controllers/auth';

const router = Router();


router.route('/signup').post(signup);

router.route('/signin').post(signin);

router.route('/refresh_token').post(refresh_token);

export default router;
