import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { styles } from './styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { loginUser } from '../../Data_Control/Login'; // Importe a função loginUser

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async () => {
        const result = await loginUser(email, senha);
        if (result.success) {
            setLoginFailed(false);
            navigation.navigate('Home'); // Redirecione para a tela principal ou desejada
        } else {
            setLoginFailed(true);
            setErrorMessage(result.message || '');
        }
    };

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
                            <Text style={styles.Text}>Email:</Text>
                            <TextInput
                                style={[styles.inputEmail, loginFailed && { borderColor: 'red' }]}
                                placeholder="exemplo@email.com"
                                placeholderTextColor={'#d0d0d0'}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Text style={styles.Text}>Senha:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.inputSenha, loginFailed && { borderColor: 'red' }]}
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
                            {loginFailed && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
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
};

export default Login;