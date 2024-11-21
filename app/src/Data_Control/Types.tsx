export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    RecuperarSenha: undefined;
    Home: undefined;
    UserSearch: undefined; // A tela de pesquisa de usuário, sem parâmetros
    Profile: { otherUserId: string }; // A tela de perfil, que recebe um parâmetro `userId`
    NewPost: undefined;
    PostProfile: { postId: string, userId: string };
    SearchUserProfileScreen: undefined;
    Location: undefined;
    Shop: undefined;
    updateProfile: undefined;
  };
  