import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { styles } from './style';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../../Data_Control/Register';

const Cadastro: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [nomeCompleto, setNomeCompleto] = useState<string>('');
    const [usuario, setUsuario] = useState<string>('');
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    
    const navigation = useNavigation(); // Hook de navegação
    
    const handleRegister = async () => {
        const response = await registerUser({ email, nomeCompleto, usuario, dataNascimento, senha });
        
        if (response.success) {
            alert(response.message);
            navigation.goBack(); // Redireciona o usuário de volta após registro
        } else {
            alert(response.message); // Mostra mensagem de erro
        }
    }

    return (
        <KeyboardAvoidingView style={styles.Main}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.Arrowbacksharp} onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={40} color="black" />
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.CardFormulario}>
                            <Text style={styles.TextH1}>Crie agora sua {'\n'}       conta!</Text>
                            <View>
                                <Text style={styles.InputTitulo}>E-mail :</Text>
                                <TextInput
                                    style={styles.Input}
                                    placeholder="exemplo@email.com"
                                    placeholderTextColor={'#8a8989'}
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                            <View>
                                <Text style={styles.InputTitulo}>Nome completo :</Text>
                                <TextInput
                                    style={styles.Input}
                                    placeholder="Henrique Machado Furtado de Andrade"
                                    placeholderTextColor={'#8a8989'}
                                    keyboardType="ascii-capable"
                                    value={nomeCompleto}
                                    onChangeText={setNomeCompleto}
                                />
                            </View>
                            <View>
                                <Text style={styles.InputTitulo}>Usuário :</Text>
                                <TextInput
                                    style={styles.Input}
                                    placeholder="Henrique_Furtado14"
                                    placeholderTextColor={'#8a8989'}
                                    keyboardType="default"
                                    value={usuario}
                                    onChangeText={setUsuario}
                                />
                            </View>
                            <View>
                                <Text style={styles.InputTitulo}>Data de nascimento :</Text>
                                <TextInput
                                    style={styles.Input}
                                    placeholder="14/11/2003"
                                    placeholderTextColor={'#8a8989'}
                                    keyboardType="decimal-pad"
                                    value={dataNascimento}
                                    onChangeText={setDataNascimento}
                                />
                            </View>
                            <View>
                                <Text style={styles.InputTitulo}>Senha :</Text>
                                <TextInput
                                    style={styles.Input}
                                    placeholder="Digite sua senha"
                                    placeholderTextColor={'#8a8989'}
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    value={senha}
                                    onChangeText={setSenha}
                                />
                            </View>
                            <TouchableOpacity style={styles.ButtonCadastro} onPress={handleRegister} >
                                <Text style={styles.ButtonCadastroText}>
                                    CADASTRAR
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Cadastro;
