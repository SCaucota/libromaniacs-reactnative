import { StyleSheet, Text, View,Pressable} from 'react-native';
import {colors} from '../globals/colors';

const Counter = ({disabled, quantity,increment,decrement}) => {

    

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, disabled && styles.btnDisabled]} disabled={disabled} onPress={decrement}>
          <Text style={styles.textButton}>-</Text>
      </Pressable>
      <Text style={styles.text}>{quantity}</Text>
      <Pressable disabled={disabled} style={[styles.button, disabled && styles.btnDisabled]} onPress={increment}>
        <Text style={styles.textButton}>+</Text>
      </Pressable>
      
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"flex-end",
    margin:10,
    alignItems:"center",
    gap:20,
  },
  button:{
    backgroundColor: colors.primary,
    width:50,
    padding:10,
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center"
  },
  textButton:{
    color: colors.secondary,
    fontSize:20
  },
  btnDisabled: {
    backgroundColor: colors.primaryClear,
    opacity: 0.5
  }
})