import brandRouter from "./brand.js";
import buyRouter from "./buy.js";
import productRouter from "./product.js";
import saleRouter from "./sale.js";
import typeRouter from "./type.js";
import authRouter from "./auth.js";
import { Router } from "express";

const router = new Router();

router.use('/brand', brandRouter);
router.use('/buy', buyRouter);
router.use('/product', productRouter);
router.use('/sale', saleRouter);
router.use('/type', typeRouter);
router.use('/auth', authRouter);

export default router;