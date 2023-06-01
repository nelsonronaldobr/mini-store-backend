import { Router } from 'express';
import { startGetRoles } from '../../controllers/admin/role.controller.js';
import { checkRoleAuth } from '../../middlewares/checkRoleAuth.middleware.js';
import { USER_ROLES } from '../../interfaces/user.interface.js';

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                  GET ROLES                                 */
/* -------------------------------------------------------------------------- */

router.get(
    '/',
    checkRoleAuth([USER_ROLES.ADMIN, USER_ROLES.SALESMAN]),
    startGetRoles
);

export default router;
