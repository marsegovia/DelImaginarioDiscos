import { db } from "../Data/data.js";
import { 
  doc, getDoc, collection, getDocs, 
  addDoc, updateDoc, deleteDoc
} from "firebase/firestore";

export async function obtenerProducto(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() };
}

export async function obtenerProductos() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const productos = [];

  querySnapshot.forEach((docu) => {
    productos.push({ id: docu.id, ...docu.data() });
  });

  return productos;
}

export async function agregarProducto(producto) {
  const docRef = await addDoc(collection(db, "products"), producto);
  return { id: docRef.id, ...producto };
}

export async function actualizarProducto(id, producto) {
  await updateDoc(doc(db, "products", id), producto);
  return { id, ...producto };
}

export async function eliminarProducto(id) {
  await deleteDoc(doc(db, "products", id));
  return true;
}
