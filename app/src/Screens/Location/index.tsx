// src/screens/EventScreen/index.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";
import BarraNavegacao from "../../components/BarraDeNavegacao/Index";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const EventScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cabecario}>
      <View style={styles.icons}>
          <MaterialCommunityIcons name="message" size={24} color="white" style={{ marginRight: 15 }} />
          <AntDesign name="heart" size={24} color="white" style={{ marginRight: 10 }} />
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>      
      </View>
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Seção do evento */}
        <View style={styles.eventHeader}>
          <Text style={styles.headerText}>Em cartaz:</Text>
          <View style={styles.eventDetails}>
            <Image
              source={{ uri: "https://via.placeholder.com/80" }} // Adapte a URL da imagem conforme necessário
              style={styles.eventImage}
            />
            <View>
              <Text style={styles.eventDay}>SEXTA-FEIRA</Text>
              <Text style={styles.eventDate}>22/10</Text>
              <Text style={styles.eventLocation}>
                Auditório Municipal Patos - PB
              </Text>
            </View>
          </View>
        </View>

        {/* Seção do Mapa */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -7.0261,
            longitude: -37.2756,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: -7.0261, longitude: -37.2756 }}
            title="Local do Evento"
            description="Auditório Municipal Patos - PB"
          />
        </MapView>

        {/* Informações Adicionais */}
        <View style={styles.additionalInfo}>
          <Image
            source={{ uri: "https://via.placeholder.com/120" }} // Substitua pela imagem correta
            style={styles.locationImage}
          />
          <Text style={styles.locationText}>
            Paraíba{"\n"}
            R. Manoel Torres, 220 - Salgadinho, Patos - PB, 58706-510{"\n"}
            2.3 KM
          </Text>
        </View>
      </View>

      {/* Barra de Navegação */}
      <View style={styles.navContainer}>
        <BarraNavegacao />
      </View>
    </View>
    </View>
  );
};

export default EventScreen;
