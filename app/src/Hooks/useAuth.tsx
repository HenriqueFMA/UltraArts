import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from "../Screens/FireBase/firebaseConfig";

export default function useAuth() {
  // Atualize o tipo para aceitar tanto 'User' quanto 'null'
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log('Got User=', user);
      if (user) {
        setUser(user);  // 'user' agora tem o tipo correto
      } else {
        setUser(null);
      }
    });

    return unsub; // Limpar o listener quando o componente desmontar
  }, []); // Executar apenas uma vez quando o componente monta

  return { user };
}
