import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
     const [emails, setEmails] = useState([]);

     useEffect(() => {
          async function getData() {
               const response = await fetch('https://mobile.ect.ufrn.br:3002/emails');
               const emails = await response.json();
               setEmails(emails);
          };
          getData();
     }, []);

     function renderItem({ item }) {
          return <TouchableOpacity style={styles.mail} onPress={() => navigation.navigate('MailDetail', {
               id: item.id
          })}>
               <Image style={styles.mailPicture} source={{ uri: item.picture }}></Image>
               <View style={styles.textContainer}>
                    <View style={styles.fromToAndDate}>
                         <Text style={styles.fromToText}>From {item.from} to {item.to}</Text>
                         <Text style={styles.date}>{item.time}</Text>
                    </View>
                    <Text style={styles.title}>{item.tittle}</Text>
                    <View style={styles.summaryStar}>
                         <Text>{item.summary}</Text>
                         <Text>
                              {
                                   item.star == true ?
                                        <FontAwesome5 name="star" size={24} color="black" onPress={() => navigation.navigate('ChatListScreen')} /> :
                                        ''
                              }
                         </Text>
                    </View>
               </View>
          </TouchableOpacity>
     };

     return (
          <View style={styles.container}>
               <StatusBar style="auto" />
               <Header />
               <FlatList
                    data={emails}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    vertical
                    showsVerticalScrollIndicator={false}
               />
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
          marginTop: Constants.statusBarHeight
     },
     mail: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          height: 90
     },
     mailPicture: {
          height: 50,
          width: 50,
          borderRadius: 50,
          marginRight: 15
     },
     textContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'
     },
     fromToAndDate: {
          flexDirection: 'row',
          justifyContent: 'space-between'
     },
     fromToText: {
          fontWeight: 'bold'
     },
     date: {
          color: '#1B7CED'
     },
     title: {
          fontWeight: 'bold'
     },
     summaryStar: {
          flexDirection: 'row',
          justifyContent: 'space-between'
     },
});