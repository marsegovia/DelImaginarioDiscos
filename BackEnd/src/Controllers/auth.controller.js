import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Data/data.js"; // 👈 ESTO FALTABA

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCredential.user.getIdToken();

    res.json({
      ok: true,
      token,
      email: userCredential.user.email
    });

  } catch (error) {
    res.status(401).json({
      ok: false,
      error: "Credenciales inválidas"
    });
  }
};
