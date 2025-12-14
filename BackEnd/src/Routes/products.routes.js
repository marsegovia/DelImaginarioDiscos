import express from "express"
import {
    addProduct,
    deleteProduct,
    editProduct,
    getAllProducts,
    getProductById
} from "../Controllers/products.controllers.js"
import { authAdmin } from "../Middlewares/authAdmin.js";
import upload from "../Middlewares/uploads.js";

const routes = express.Router()

routes.get("/", getAllProducts)

routes.get("/:id", getProductById)

routes.post("/create", upload.single("image"),addProduct);

routes.delete("/:id",authAdmin, deleteProduct)

routes.put("/:id",authAdmin, upload.single("image"), editProduct);


export default routes;