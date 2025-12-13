import express from "express"
import {
    addProduct,
    deleteProduct,
    editProduct,
    getAllProducts,
    getProductById
} from "../controllers/products.controllers.js"
//import { authentication } from "../Middlewares/authentication.js"
import upload from "../Middlewares/uploads.js";

const routes = express.Router()

routes.get("/", getAllProducts)

routes.get("/:id", getProductById)

routes.post("/create", upload.single("image"),addProduct);

routes.delete("/:id", deleteProduct)

routes.put("/:id", upload.single("image"), editProduct);


export default routes;