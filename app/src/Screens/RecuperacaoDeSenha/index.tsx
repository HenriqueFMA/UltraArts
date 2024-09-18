import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView,Alert,Image} from "react-native";
import { styles } from './styles';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../FireBase/firebaseConfig'

const RecuperarSenha: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState('');


    
    async function Enviar_emailRecuperacao() {
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('E-mail enviado', 'Verifique sua caixa de entrada para redefinir sua senha.');
        } catch (error: any) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível enviar o e-mail de recuperação. Verifique o endereço de e-mail.');
        }
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.Main}
        >
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableOpacity style={styles.Arrowbacksharp} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={40} color="black" />
                    </TouchableOpacity>
                    <View style={styles.container}>
                    <View style={styles.containerText}>
                    <Text style={styles.TextH1}>Esqueceu</Text>
                    <Text style={styles.TextH1}>   sua senha?</Text>
                    </View>
                    <View style={styles.containerText}>
                    <Text>Informe o email da conta que deseja</Text>
                    <Text>redefinir a senha.</Text>
                    </View>
                    <View style={styles.CardLogin}>
                    <Text style={styles.Text}>Email:</Text>
                            <TextInput
                                style={styles.inputEmail}
                                placeholder="exemplo@email.com"
                                placeholderTextColor={'#d0d0d0'}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TouchableOpacity style={styles.ButtonEntrar} onPress={Enviar_emailRecuperacao}>
                            <Text style={styles.ButtonEntrarText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
export default RecuperarSenha;

