import { Router } from 'express';
// Import index action from movies controller
import { create, listMonth } from '../controllers/exercises';

// Initialize the router
const router = Router();

router.route('/exercises').post(create);

router.route('/exercises/month').get(listMonth);

export default router;
