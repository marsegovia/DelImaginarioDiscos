import express from "express"
import {
    addProduct,
    deleteProduct,
    editProduct,
    getAllProducts,
    getProductById
} from "../controllers/products.controllers.js"
import { authAdmin } from "../middlewares/authAdmin.js";
import upload from "../middlewares/uploads.js";

const routes = express.Router()

routes.get("/", getAllProducts)

routes.post("/create", upload.single("image"),addProduct);

routes.get("/:id", getProductById)

routes.delete("/:id",authAdmin, deleteProduct)

routes.put("/:id",authAdmin, upload.single("image"), editProduct);


export default routes;