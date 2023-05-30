import { Router } from 'express';
import { startGetRoles } from '../controllers/role.controller.js';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import { checkRoleAuth } from '../middlewares/checkRoleAuth.middleware.js';
import { USER_ROLES } from '../interfaces/user.interface.js';

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                  GET ROLES                                 */
/* -------------------------------------------------------------------------- */

router.get(
    '/',
    checkAuth,
    checkRoleAuth([USER_ROLES.ADMIN, USER_ROLES.SALESMAN]),
    startGetRoles
);

export default router;
