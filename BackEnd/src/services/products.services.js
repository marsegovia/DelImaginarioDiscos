import { 
  agregarProducto, 
  eliminarProducto, 
  obtenerProducto, 
  obtenerProductos,
  actualizarProducto
  //eliminarProducto
} from "../models/products.models.js";

export const addProductService = async (product) => {
  return await agregarProducto(product);
};

export const deleteProductService = async (id) => {
  return await eliminarProducto(id);
};

export const getAllProductsService = async () => {
  return await obtenerProductos();
};

export const getProductByIdService = async (id) => {
  return await obtenerProducto(id);
};

export const editProductService = async (id, data) => {
  return actualizarProducto(id, data);
};
