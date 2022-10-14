import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Header({ navigation }) {
     return (
          <View style={styles.header}>
               <Image style={styles.mailLogo} source={require('../assets/images/logo.png')} />
          </View>
     );
};

const styles = StyleSheet.create({
     header: {
          height: 100,
          padding: 10,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
     },
     mailLogo: {
          height: 30,
          width: 130
     }
});