import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Screens/FireBase/firebaseConfig';


export const loginUser = async (email: string, senha: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, senha);
        return { success: true };
    } catch (erro) {
        console.error("Erro no login:", erro);
        return { success: false, message: "Credenciais incorretas ou erro na autenticação." };
    }
};
