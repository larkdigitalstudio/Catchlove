import express from 'express';
import {addCustomer} from '../controllers/Add.js';

const router = express.Router();

//route definitions
//add customer route
router.post('/addCustomer', addCustomer);
//add workorder route
//router.post('/addWorkorder', addWorkorder);


//export the router
export default router;