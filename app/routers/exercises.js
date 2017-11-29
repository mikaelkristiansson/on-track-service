import { Router } from 'express';
// Import index action from movies controller
import {create, listAllInYear, listMonth, listYear} from '../controllers/exercises';

// Initialize the router
const router = Router();

router.route('/exercises').post(create);
router.route('/exercises').get(listAllInYear);

router.route('/exercises/month').get(listMonth);
router.route('/exercises/year').get(listYear);

export default router;
