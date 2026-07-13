import express from 'express';
import { submitContact, getContacts } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = express.Router();

router.route('/')
  .post(submitContact)
  .get(protect, adminOnly, getContacts);

export default router;
