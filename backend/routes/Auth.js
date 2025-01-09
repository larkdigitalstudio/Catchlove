import express from 'express';
import {CustLogin, WorkLogin} from '../controllers/Auth.js';

const router = express.Router();

//route definitions
//customer login route
router.post('/login', CustLogin);
// workshop login route
router.post('/login', WorkLogin);

//export the router
export default router;