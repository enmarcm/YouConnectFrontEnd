import React, { useContext } from "react";
import { View, SectionList, Text, StyleSheet, StatusBar, VirtualizedList } from "react-native";
import { ContactItemProps } from "../types";
const Groups = () => {


    return (
      <View style={styles.container}>
  
          </View>
    );

    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'flex-start', // Centra el contenido en la parte superior
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center', // Centra el texto horizontalmente
  },
  // ...
});
  export default Groups;