import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetProductsByCategoryQuery } from '../services/shop'
import { FlatList } from 'react-native-web'
import CardProduct from '../components/CardProduct'

const ProductsByCategory = ({route}) => {

    const {category} = route.params;
    const {data,isSuccess,isError,error,isLoading} = useGetProductsByCategoryQuery(category);
    const [keyword,setKeyword] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(isSuccess){
            setProducts(Object.values(data));
        }
    },[isSuccess,data])

    useEffect(() => {
        if(isSuccess){
            setProducts(Object.values(data).filter(product => product.title.includes(keyword)))
        }
    },[keyword,isSuccess])

    if(isLoading) return <View><Text>cargando</Text></View>
    if(isError) return <View><Text>{error.message}</Text></View>

  return (
    <View>
      {products.length === 0 ? (
        <Text style={styles.noProductsText}>No hay productos disponibles</Text>
    ) : (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CardProduct product={item} />}
        />
    )}
    </View>
  )
}

export default ProductsByCategory

const styles = StyleSheet.create({})