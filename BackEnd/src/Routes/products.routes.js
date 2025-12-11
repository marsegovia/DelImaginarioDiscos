import express from "express"
import {
    addProduct,
    deleteProduct,
    editProduct,
    getAllProducts,
    getProductById
} from "../controllers/products.controllers.js"
//import { authentication } from "../Middlewares/authentication.js"

const routes = express.Router()

routes.get("/", getAllProducts)

routes.get("/:id", getProductById)

routes.post("/create", authentication, addProduct)

routes.delete("/:id", authentication, deleteProduct)

//routes.put("/products/:id", editProduct)

//routes.post("/products", )


export default routes;