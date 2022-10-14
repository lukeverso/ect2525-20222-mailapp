import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { WebView } from 'react-native-webview';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MailDetail({ route }) {
     const { id } = route.params;

     const [mail, setMail] = useState([]);

     useEffect(() => {
          async function getData() {
               const response = await fetch(`https://mobile.ect.ufrn.br:3002/emails/${id}`);
               const mail = await response.json();
               setMail(mail);
          };
          getData();
     }, []);

     return (
          <View style={styles.container}>
               <StatusBar style="auto" />
               <View style={styles.mailTitle}>
                    <Text style={styles.mailTitleText}>{mail.tittle}</Text>
                    <Text>
                              {
                                   mail.star == true ?
                                        <FontAwesome5 name="star" size={24} color="black" onPress={() => navigation.navigate('ChatListScreen')} /> :
                                        ''
                              }
                         </Text>
               </View>
               <View style={styles.mailDetails}>
                    <Image style={styles.mailPicture} source={{ uri: mail.picture }}></Image>
                    <View style={styles.mailData}>
                         <View style={styles.fromAndDate}>
                              <Text style={styles.from}>{mail.from}</Text>
                              <Text style={styles.date}>{mail.time}</Text>
                         </View>
                         <Text>to {mail.to}</Text>
                    </View>
               </View>
               <View style={styles.mailBody}>
                    <WebView
                         style={styles.mailBodyStyle}
                         source={{ html: mail.body }}
                    />
               </View>
          </View>
     )
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff'
     },
     mailTitle: {
          justifyContent: 'center',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
     },
     mailDetails: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15
     },
     mailTitleText: {
          fontWeight: 'bold'
     },
     mailData: {
          flex: 1
     },
     mailPicture: {
          height: 50,
          width: 50,
          borderRadius: 50,
          marginRight: 15
     },
     fromAndDate: {
          flexDirection: 'row',
          justifyContent: 'space-between'
     },
     from: {
          fontWeight: 'bold'
     },
     mailTitleText: {
          fontSize: 26
     },
     mailBody: {
          flex: 1
     }
});