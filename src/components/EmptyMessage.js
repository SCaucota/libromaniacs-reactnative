import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { colors } from '../globals/colors';

const EmptyMessage = ({message}) => {
  return (
    <View style={styles.emptyCartContainer}>
        <View style={styles.emptyCart}>
            <Text style={styles.emptybtnText}>{message}</Text>
        </View>
    </View>
  )
}

export default EmptyMessage

const styles = StyleSheet.create({
    emptyCartContainer:{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
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