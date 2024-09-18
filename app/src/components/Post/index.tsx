import { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { styles } from './styles';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../../Screens/FireBase/firebaseConfig'; // Certifique-se de configurar corretamente

const Post: React.FC<{ navigation: any, postId: string }> = ({ navigation, postId }) => {
    const { width } = Dimensions.get('window');
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar as imagens do Firestore
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const db = getFirestore(firebaseApp);
                const postRef = doc(db, 'Posts', postId); // Substitua 'Posts' pelo nome da sua coleção
                const postSnap = await getDoc(postRef);

                if (postSnap.exists()) {
                    const postData = postSnap.data();
                    setImages(postData.Imagem || []); // Atualize o estado com o array de imagens
                } else {
                    console.log("Nenhum documento encontrado!");
                }
            } catch (error) {
                setError('Erro ao buscar dados.');
                console.error("Erro ao buscar dados do Firestore:", error);
            }
        };

        fetchPostData();
    }, [postId]);

    return (
        <View>
            <View style={styles.Heade}>
                <TouchableOpacity>
                    <Image
                        style={styles.FotoPerfil}
                        // Adicione a fonte da imagem aqui, se necessário
                    />
                    <Text>User_Name</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{ flex: 1 }}>
                {error ? (
                    <Text>{error}</Text>
                ) : (
                    <Carousel
                        loop
                        width={width}
                        height={width / 2}
                        autoPlay={true}
                        data={images} // Use o array de imagens do Firestore
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    source={{ uri: item }} // Renderize a imagem usando a URI do Firestore
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                    }}
                                />
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    );
}

export default Post;
