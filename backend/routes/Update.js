import express from 'express';
import { updateCustomer, updateWorkshop } from '../controllers/Update.js';


const router = express.Router();

//route definitions
// update customer route
router.put('/updateCustomer/:customerId', updateCustomer);
// update workshop route
router.put('/updateWorkshop/:workshopId', updateWorkshop);

//export the router
export default router;