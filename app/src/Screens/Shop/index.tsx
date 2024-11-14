import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import BarraNavegacao from '../../components/BarraDeNavegacao/Index'; 
<<<<<<< HEAD
=======
import { useNavigation } from '@react-navigation/native';
>>>>>>> b70a45ad20bf8eda07b8218d1149660aac4ab61d
import { styles } from './style';
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ArtGalleryScreen() {
  const artItems = [
<<<<<<< HEAD
    { id: 1, title: 'Quadro Abstrato 1', author: 'Autor desconhecido', price: 'R$400,00', size: '1.5x1.5m'},
    { id: 2, title: 'A Noite Estrelada', author: 'Vincent Van Gogh', price: 'R$1.500.000', size: '1.5x1.5m'},
    { id: 3, title: 'Vaso Grego', author: 'Autor desconhecido', price: 'R$700,00', size: '1.5x1.5m'},
    { id: 4, title: 'Quadro Abstrato 3', author: 'Autor desconhecido', price: 'R$700,00', size: '1.5x1.5m'},
    { id: 5, title: 'Estátua', author: 'Autor desconhecido', price: 'R$800,00', size: '1.5x1.5m'},
    { id: 6, title: 'O Grito', author: 'Edvard Munch', price: 'R$10.000.000', size: '1.2x1.0m'},
    { id: 7, title: 'O Beijo', author: 'Gustav Klimt', price: 'R$2.000.000', size: '1.8x1.8m'},
    { id: 8, title: 'Mona Lisa', author: 'Leonardo Da Vinci', price: 'R$300.000.000', size: '0.77x0.53m'},
    { id: 9, title: 'Guernica', author: 'Pablo Picasso', price: 'R$200.000.000', size: '3.5x7.8m'},
    { id: 10, title: 'A Persistência da Memória', author: 'Salvador Dalí', price: 'R$80.000.000', size: '0.9x1.3m'},
    { id: 11, title: 'Café da Manhã no Campo', author: 'Juan Gris', price: 'R$600.000', size: '1.2x1.0m'},
    { id: 12, title: 'Crianças Brincando', author: 'Piet Mondrian', price: 'R$500.000', size: '1.0x1.0m'},
=======
    { id: 1, title: 'Quadro Abstrato 1', author: 'Autor desconhecido', price: 'R$400,00', size: '1.5x1.5m', image: require('../images/profilepic.png') },
    { id: 2, title: 'A Noite Estrelada', author: 'Vincent Van Gogh', price: 'R$1.500.000', size: '1.5x1.5m', image: require('../images/profilepic.png') },
    { id: 3, title: 'Vaso Grego', author: 'Autor desconhecido', price: 'R$700,00', size: '1.5x1.5m', image: require('../images/profilepic.png') },
    { id: 4, title: 'Quadro Abstrato 3', author: 'Autor desconhecido', price: 'R$700,00', size: '1.5x1.5m', image: require('../images/profilepic.png') },
    { id: 5, title: 'Estátua', author: 'Autor desconhecido', price: 'R$800,00', size: '1.5x1.5m', image: require('../images/profilepic.png') },
    { id: 6, title: 'O Grito', author: 'Edvard Munch', price: 'R$10.000.000', size: '1.2x1.0m', image: require('../images/profilepic.png') },
    { id: 7, title: 'O Beijo', author: 'Gustav Klimt', price: 'R$2.000.000', size: '1.8x1.8m', image: require('../images/profilepic.png') },
    { id: 8, title: 'Mona Lisa', author: 'Leonardo Da Vinci', price: 'R$300.000.000', size: '0.77x0.53m', image: require('../images/profilepic.png') },
    { id: 9, title: 'Guernica', author: 'Pablo Picasso', price: 'R$200.000.000', size: '3.5x7.8m', image: require('../images/profilepic.png') },
    { id: 10, title: 'A Persistência da Memória', author: 'Salvador Dalí', price: 'R$80.000.000', size: '0.9x1.3m', image: require('../images/profilepic.png') },
    { id: 11, title: 'Café da Manhã no Campo', author: 'Juan Gris', price: 'R$600.000', size: '1.2x1.0m', image: require('../images/profilepic.png') },
    { id: 12, title: 'Crianças Brincando', author: 'Piet Mondrian', price: 'R$500.000', size: '1.0x1.0m', image: require('../images/profilepic.png') },
>>>>>>> b70a45ad20bf8eda07b8218d1149660aac4ab61d
  ];
  

  return (
    <View style={styles.container}>
      <View style={styles.cabecario}>
      <View style={styles.icons}>
          <MaterialCommunityIcons name="message" size={24} color="white" style={{ marginRight: 15 }} />
          <AntDesign name="heart" size={24} color="white" style={{ marginRight: 10 }} />
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>      
      </View>
      <View style={styles.conteudo}>
      <View style={styles.searchBarContainer}>
        <TextInput placeholder="Pesquisar..." style={styles.searchBar} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {artItems.map((item) => (
          <View key={item.id} style={styles.card}>
<<<<<<< HEAD
            {/* {item.image && <Image source={item.image} style={styles.image} />} */}
=======
            <Image source={item.image} style={styles.image} />
>>>>>>> b70a45ad20bf8eda07b8218d1149660aac4ab61d
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.size}>{item.size}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
      <BarraNavegacao /> {/* Adicionando a Barra de Navegação */}
    </View>
  );
}

<<<<<<< HEAD
=======

>>>>>>> b70a45ad20bf8eda07b8218d1149660aac4ab61d
