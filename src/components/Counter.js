import { StyleSheet, Text, View,Pressable} from 'react-native'

const Counter = ({disabled, quantity,increment,decrement}) => {

    

  return (
    <View style={styles.container}>
      <Pressable disabled={disabled} style={styles.button} onPress={decrement}>
          <Text style={styles.textButton}>-</Text>
      </Pressable>
      <Text style={styles.text}>{quantity}</Text>
      <Pressable disabled={disabled} style={styles.button} onPress={increment}>
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
    backgroundColor:'red',
    width:50,
    padding:10,
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center"
  },
  textButton:{
    color: 'gray',
    fontSize:20
  },
})