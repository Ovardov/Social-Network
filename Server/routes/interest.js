// Libraries
import { Router } from 'express';
// Controllers
import { interestController } from '../controllers';
// Utils
import { auth } from '../utils';
// Validators
import { getOneInterestDataValidator } from '../validators/interest'

const router = Router();

router.get('/:name', auth(), getOneInterestDataValidator, interestController.get.getOneInterest);

export default router;
