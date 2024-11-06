import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { styles } from './styles';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth } from "../FireBase/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');  
    const [senha, setSenha] = useState('');  
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);  
    const [errorMessage, setErrorMessage] = useState<string | null | undefined>(undefined); 

    // Função para alternar a visibilidade da senha
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Função para tratar o login
    const handleSubmit = async () => {
        if (email && senha) {
            try {
                await signInWithEmailAndPassword(auth, email, senha);
            } catch (erro) {
                console.log("Erro ao fazer login:", erro);
                setErrorMessage("Erro ao tentar realizar o login. Tente novamente.");
            }
        } else {
            setErrorMessage("Por favor, preencha todos os campos.");  // Caso o email ou senha estejam vazios
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.Main}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Image
                        style={styles.UltraLogo}
                        source={require('../images/logo ULTRART.png')}
                    />
                    <View style={styles.container}>
                        <View style={styles.CardLogin}>
                            <Text style={styles.TextH1}>Bora entrar?</Text>
                            <Text>Faça login para iniciar</Text>

                            {/* Exibe a mensagem de erro se houver */}
                            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}

                            <Text style={styles.Text}>Email:</Text>
                            <TextInput
                                style={styles.inputEmail}
                                placeholder="exemplo@email.com"
                                placeholderTextColor={'#d0d0d0'}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <Text style={styles.Text}>Senha:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.inputSenha}
                                    placeholder="********"
                                    placeholderTextColor={'#d0d0d0'}
                                    secureTextEntry={!isPasswordVisible}
                                    value={senha}
                                    onChangeText={setSenha}
                                />
                                <TouchableOpacity
                                    style={styles.ToggleButton}
                                    onPress={togglePasswordVisibility}
                                >
                                    <Text style={styles.ToggleButtonText}>
                                        {isPasswordVisible ? <MaterialIcons name="visibility" size={24} color="black" /> : <MaterialIcons name="visibility-off" size={24} color="black" />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.ButtonEntrar} onPress={handleSubmit}>
                            <Text style={styles.ButtonEntrarText}>Entrar</Text>
                        </TouchableOpacity>

                        <View style={styles.ContainerLinks}>
                            <View style={styles.LinkWrapper}>
                                <TouchableOpacity style={styles.ButtonEsqueceuSenha} onPress={() => navigation.navigate('RecuperarSenha')}>
                                    <Text style={styles.ButtonEsqueceuSenhaText}>Esqueceu a senha?</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.Separator} />

                            <View style={styles.LinkWrapper}>
                                <TouchableOpacity style={styles.ButtonCadastro} onPress={() => navigation.navigate('Cadastro')}>
                                    <Text style={styles.ButtonCadastroText}>Cadastre-se</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Login;
