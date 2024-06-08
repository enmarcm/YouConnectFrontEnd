import React, { FC, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { StyleSheet } from "react-native";
import useContactsPage from "../customHooks/useContactsPage";
import { Image } from "react-native"; // Import the Image component from react-native
import { useCommunication } from "../customHooks/useCommunication";
import Icon from "react-native-vector-icons/Ionicons";
import useContactsGroupPage from "../customHooks/useContactGroupPage";
import { LoadingContext } from "../context/LoadingContext";

const ContactPage: FC = () => {
  const { id } = useParams();
  const { handleCallPress, handleSmsPress } = useCommunication();
  const { setIsLoading } = useContext(LoadingContext);

  const data: any = useContactsPage({ id });
  const data2: any = useContactsGroupPage({ id });

  const navigate = useNavigate();

  useEffect(() => {
    if (!data || !data2) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [data, data2]);

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

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigate("/editContact/" + id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="options" size={30} color="black" />
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Contact Info</Text>
          <View style={styles.numberContainer}>
            {Array.isArray(data.number) &&
              data.number.map((num, index) => (
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
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>Groups</Text>
          {Array.isArray(data2) &&
            data2.map((group, index) => (
              <View key={index} style={styles.singleNumberContainer}>
                <Text style={styles.number}>{group.name}</Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    flexDirection: "column",
    // justifyContent: 'center',
    // marginBottom: 20,
    alignItems: "center",
  },
  detailsContainer: {
    flexDirection: "column",
    backgroundColor: "#F3F3FB",
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
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  numberAndIcon: {
    flexDirection: "row",
    alignItems: "center",
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
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#F3F3FB",
    borderRadius: 15,
    padding: 3,
  },
  iconButton: {
    marginHorizontal: 50,
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    textAlign: "center",
    alignContent: "center",
    margin: 10,
    fontWeight: "semibold",
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
