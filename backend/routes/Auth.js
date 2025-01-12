import express from 'express';
import {CustLogin, WorkLogin, registerCustomer, registerWorkshop} from '../controllers/Auth.js';

const router = express.Router();

//route definitions
//customer login route
router.post('/loginCustomer', CustLogin);
// workshop login route
router.post('/loginWorkshop', WorkLogin);
//workshop registration route
router.post('/registerWorkshop', registerWorkshop);
//customer registration route
router.post('/registerCustomer', registerCustomer);

//export the router
export default router;