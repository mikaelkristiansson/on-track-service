import express, { Router } from 'express';
// Import index action from movies controller
import { index } from '../controllers/exercises';

// Initialize the router
const router = Router();

// Handle /movies.json route with index action from exercises controller
router.route('/exercises')
  .get(index);

export default router;
