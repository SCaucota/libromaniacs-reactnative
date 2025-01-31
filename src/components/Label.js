import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../globals/colors';

const Label = ({text}) => {
  return (
    <View style={styles.container}>
        <Entypo name='dot-single' size={20} color='white'/>
        <Text style={styles.labelText}>{text}</Text>
    </View>
  )
}

export default Label

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.primaryClear,
        borderRadius: 15,
        height: 30,
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingRight: 15,
    },
    labelText:{
      color: 'white'
    }
})