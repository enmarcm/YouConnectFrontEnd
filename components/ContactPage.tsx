import React, { FC} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useParams } from "react-router-native";
import { StyleSheet } from "react-native";
import useContactsPage from "../customHooks/useContactsPage";
import { Image } from "react-native"; // Import the Image component from react-native
import { useCommunication } from "../customHooks/useCommunication";
import Icon from "react-native-vector-icons/Ionicons";

const ContactPage: FC = () => {
  const { id } = useParams();
  const { handleCallPress, handleSmsPress } = useCommunication();

  const data: any = useContactsPage({ id });
  // console.log(data);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
      <Image style={styles.image} source={{ uri: data.image }} />
      <Text style={styles.name}>{data.name}</Text>
      </View>
      <View style={styles.contactinfo}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
        style={styles.iconButton}
          onPress={() => handleSmsPress(data.number[0])}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="chatbubble-outline" size={30} color="black" />
          <Text>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.iconButton}
          onPress={() => handleCallPress(data.number[0])}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="call-outline" size={30} color="black" />
          <Text>Call</Text>
        </TouchableOpacity>

      </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Informacion de Contacto</Text>
          {/* <Text style={styles.email}>{data.email}</Text> */}
          <View style={styles.numberContainer}>
  {Array.isArray(data.number) && data.number.map((num, index) => (
    <View key={index} style={styles.singleNumberContainer}>
      <View style={styles.numberAndIcon}>
        <TouchableOpacity
          onPress={() => handleCallPress(num)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="call-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.number}>{num}</Text>
      </View>
    </View>
  ))}
</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // marginBottom: 20,
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'column',
    backgroundColor: '#F3F3FB',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    // alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: "semibold",
    marginBottom: 10,
  },
  singleNumberContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10
  },
  numberAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
  },
  ImageContainer: {
    flex: 0.3,
    backgroundColor: "#64aa54",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // padding: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contactinfo: {
    flex: 0.7,
    backgroundColor: "#F8F9FB",
    width: "100%",
    padding: 20,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    // marginBottom: 50,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: "#F3F3FB",
    borderRadius: 15,
    padding: 3
  },
  iconButton: {
    marginHorizontal: 50,
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    textAlign: "center",
    alignContent: "center",
    margin: 10,
    // position: "absolute",
  },
  email: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  number: {
    textAlign: "center",
    color: "#333333",
    fontSize: 20,
    padding: 10,
  },
});

export default ContactPage;
