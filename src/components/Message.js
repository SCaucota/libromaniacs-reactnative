import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { colors } from '../globals/colors';
import { globalStyles } from '../globals/styles';

const Message = ({message}) => {
  return (
    <View style={globalStyles.centerComponent}>
        <View style={styles.emptyCart}>
            <Text style={styles.emptybtnText}>{message}</Text>
        </View>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
    emptyCart:{
        borderStyle: 'solid',
        borderColor: colors.primary,
        borderWidth: 8,
        padding: 15,
        width: '60%',
    },
    emptybtnText: {
        color: colors.primary,
        fontFamily: 'sourceSerif',
        textAlign: 'center',
        fontSize: 20
    }
})