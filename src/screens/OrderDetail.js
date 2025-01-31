import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { formatPrice } from '../globals/functions';
import { globalStyles } from '../globals/styles';
import Entypo from 'react-native-vector-icons/Entypo'

const OrderDetail = () => {
    const route = useRoute();
    const {order} = route.params;

    const renderItem = ({item}) => {
        return(
            <View style={styles.products}>
                <View style={styles.dotTitle}>
                    <Entypo name='dot-single' size={15} color='black'/>
                    <Text>{item.title}</Text>
                </View>
                <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.subtitle}>Fecha: {order.date}</Text>
      <Text style={globalStyles.subtitle}>Productos:</Text>
      <FlatList
        data={Object.values(order.products)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Text style={globalStyles.subtitle}>Total: ${formatPrice(order.total)}</Text>
    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({
    container:{
        padding: 15
    },
    products:{
        paddingLeft: 15
    },
    dotTitle:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    quantity:{
        paddingLeft: 30,
    }
})