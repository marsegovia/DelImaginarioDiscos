/*import {
    getAllProductsService,
    getProductByIdService
} from "../services/products.services.js"*/
import * as productService from "../services/products.services.js"

export const getAllProducts = async (req, res) => {
    console.log("paso1")
    const products = await productService.getAllProductsService()
    console.log(products)
    res.status(200).json(products);
};

export const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await productService.getProductByIdService(id)
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

export const addProduct = async (req, res) => {
  try {
    console.log("📦 BODY:", req.body);
    console.log("🖼️ FILE:", req.file);

    const product = {
      ...req.body,
      Imagen: req.file.path
    };

    const newProduct = await productService.addProductService(product);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("🔥 ERROR REAL:", error);
    res.status(500).json({
      error: "Error al crear producto",
      detalle: error.message
    });
  }
};




export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log("==> Entró al DELETE con ID:", id);   // <-- AGREGAR
  try {
    await productService.deleteProductService(id);
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
