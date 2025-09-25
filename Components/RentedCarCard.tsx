import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';




export default function RentedCarCard({ name, due, deadline, rentPeriod, image }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.detailsBox}>
        <Text style={styles.carTitle}>{name}</Text>
        <Text>Due Cost: {due}</Text>
        <Text>Deadline for payment: {deadline}</Text>
        <Text>Renting period: {rentPeriod}</Text>
        
      </View>
      
      <Image source={image} style={styles.carImg} />
      
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 200,
    marginVertical: 8, 
    backgroundColor: '#eee', 
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
  },
  detailsBox: {
    flex: 1,
    flexDirection: 'column',
  },
  carTitle: {
    fontWeight: 'bold', 
    marginBottom: 4,
    fontSize: 32,
  },
  carImg: {
    flex: 1,
    height: '100%', 
    backgroundColor: '#ccc', 
    marginBottom: 4 
  },
});