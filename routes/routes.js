// import express
import express from "express";
// Import function at Controller Product
import {
    getProducts,
} from "../controller/Product";

// Init express router
const router = express.Router();

// Route get semua product
router.get('/products', getProducts);

// export router
export default router;