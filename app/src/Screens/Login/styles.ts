import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Main: {
        backgroundColor: '#297ac9',
        flex: 1,
    },
    UltraLogo:{
        height:200,
        width:200,
        marginBottom: 'auto',
        marginTop: 100,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    TextH1: {
        color: '#000',
        fontSize: 40,
        fontWeight: "bold",

    },
    CardLogin: {
        gap: 17,
        marginTop: 5,
        alignItems: 'center',

    },
    container: {

        alignItems: 'center',
        backgroundColor: '#fff',
        height: '55%',
        marginTop: 90,
        borderTopLeftRadius: 55,

    },
    Text: {
        marginLeft: -225,
        color: '#8f8e8e',
    },
    inputEmail: {
        paddingLeft: 10,
        backgroundColor: '#bfbfbf',
        borderRadius: 100,
        width: 300,
        height: 35,
        color: '#',
        padding: 6,
        fontSize: 16,
        textAlignVertical: 'center'
    },
    inputSenha: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#bfbfbf',
        borderRadius: 100,
        width: 300,
        height: 35,
        color: '#',
        padding: 6,
        fontSize: 16,
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    ToggleButton: {
        position: 'absolute',
        right: 10,
        top: 7,
    },
    passwordContainer: {
        width: 300,
        height: 35,
        position: 'relative',

    },

    ToggleButtonText: {
        color: '#0000FF',
        fontSize: 14,
    },
    ButtonEntrar: {
        backgroundColor: '#103560',
        marginTop: 30,
        width: 150,
        height: 35,
        borderRadius: 90,
        alignItems: 'center',




    },
    ButtonEntrarText: {
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#ffff',
    },
    ButtonCadastro: {},
    ButtonEsqueceuSenha: {},
    ContainerLinks: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    LinkWrapper: {
        marginBottom: 10,
    },
    ButtonEsqueceuSenhaText: {
        color: '#666',

        fontSize: 14,
    },
    ButtonCadastroText: {
        color: '#0000FF',

        fontSize: 14,
    },
    // Estilo da linha separadora
    Separator: {
        borderWidth: 0.5,
        width: 120,
        borderColor: 'black',
        margin: 10,

    },

});     