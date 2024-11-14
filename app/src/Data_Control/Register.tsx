  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
  import { firestore } from '../Screens/FireBase/firebaseConfig';

  // Função para validar o e-mail (uso de regex)
  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  interface UserData {
    email: string;
    nomeCompleto: string;
    usuario: string;
    dataNascimento: string;
    senha: string;
  }

  export const registerUser = async ({ email, nomeCompleto, usuario, dataNascimento, senha }: UserData) => {
    if (!isValidEmail(email)) {
      return { success: false, message: 'E-mail inválido. Por favor, insira um e-mail válido.' };
    }

    try {
      // Verifica se o e-mail já está em uso
      const emailQuery = query(collection(firestore, 'Users'), where('Email', '==', email));
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        return { success: false, message: 'E-mail já cadastrado. Escolha outro.' };
      }

      // Verifica se o nome de usuário já está em uso
      const usernameQuery = query(collection(firestore, 'Users'), where('Username', '==', usuario));
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        return { success: false, message: 'Nome de usuário já em uso. Escolha outro.' };
      }

      // Criação do usuário no Firebase Auth
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const userId = userCredential.user.uid;

      // Verifica se o usuário foi autenticado
      if (!userCredential.user) {
        throw new Error('Usuário não autenticado');
      }

      const userData = {
        ID: userId,
        Email: email,
        Data_de_Nascimento: dataNascimento,
        Nome_Completo: nomeCompleto,
        Username: usuario,
        Following: 0,
        Followers: 0,
        Bio: '',
        N_Posts: 0,
        IMG_Profile: '',
        TAG_User: null,
        CreateAt: new Date(),
      };

      // Adiciona o usuário ao Firestore
      await addDoc(collection(firestore, 'Users'), userData);
      console.log('Usuário registrado com sucesso:', userData);

      // Adiciona o usuário na coleção 'Search'
      await addDoc(collection(firestore, 'Search'), {
        ID: usuario,
        Id: userId,
      });

      return { success: true, message: 'Usuário registrado com sucesso!' };
    } catch (e) {
      console.error('Erro ao registrar o usuário:', e);
      return { success: false, message: 'Erro ao registrar o usuário. Tente novamente.' };
    }
  };
=======
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../Screens/FireBase/firebaseConfig';

// Função para validar o e-mail (uso de regex)
const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

interface UserData {
  email: string;
  nomeCompleto: string;
  usuario: string;
  dataNascimento: string;
  senha: string;
}

export const registerUser = async ({ email, nomeCompleto, usuario, dataNascimento, senha }: UserData) => {
  if (!isValidEmail(email)) {
    return { success: false, message: 'E-mail inválido. Por favor, insira um e-mail válido.' };
  }

  try {
    // Verifica se o e-mail já está em uso
    const emailQuery = query(collection(firestore, 'Users'), where('Email', '==', email));
    const emailSnapshot = await getDocs(emailQuery);
    if (!emailSnapshot.empty) {
      return { success: false, message: 'E-mail já cadastrado. Escolha outro.' };
    }

    // Verifica se o nome de usuário já está em uso
    const usernameQuery = query(collection(firestore, 'Users'), where('Username', '==', usuario));
    const usernameSnapshot = await getDocs(usernameQuery);
    if (!usernameSnapshot.empty) {
      return { success: false, message: 'Nome de usuário já em uso. Escolha outro.' };
    }

    // Criação do usuário no Firebase Auth
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const userId = userCredential.user.uid;

    const userData = {
      ID: userId,
      Email: email,
      Data_de_Nascimento: dataNascimento,
      Nome_Completo: nomeCompleto,
      Username: usuario,
      Following: 0,
      Followers: 0,
      Bio: '',
      N_Posts: 0,
      IMG_Profile: '',
      TAG_User: null,
      CreateAt: new Date(),
    };

    // Adiciona o usuário ao Firestore
    await addDoc(collection(firestore, 'Users'), userData);
    console.log('Usuário registrado com sucesso:', userData);

    // Adiciona o usuário na coleção 'Search'
    await addDoc(collection(firestore, 'Search'), {
      ID: usuario,
      Id: userId,
    });

    return { success: true, message: 'Usuário registrado com sucesso!' };
  } catch (e) {
    console.error('Erro ao registrar o usuário:', e);
    return { success: false, message: 'Erro ao registrar o usuário. Tente novamente.' };
  }
};

