import { Router } from 'express';
import { getUsers, inviteUser, revokeUserAccess } from '../controllers/user.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

// All routes in this file are protected and for admins only
router.use(protect, admin);

router.route('/').get(getUsers);
router.route('/invite').post(inviteUser);
router.route('/:id/revoke').post(revokeUserAccess);

export default router;
