import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import { colors } from "../globals/colors";

const CardCategory = ({category, icon}) => {
    const navigation = useNavigation();
  return (
    <Pressable style={styles.btn} onPress={() => {
        navigation.navigate("ProductsByCategory", {category})
    }}>
        <View style={styles.btnContent}>
            <Entypo name={icon} size={20} color={colors.secondary}/>
            <Text style={styles.btnText}>{category.toUpperCase()}</Text>
        </View>
    </Pressable>
  )
}

export default CardCategory

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    height: 100,
    width: 130,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  btnContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  btnText:{
    color: colors.secondary,
    fontFamily: 'montserrat',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})