import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarouselProducts from '../components/CarouselProducts';
import { FlatList } from 'react-native-web';
import { useGetProductsQuery } from '../services/shop';

const Home = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <Text>Cargando productos...</Text>;
  if (isError) return <Text>Error al cargar los productos</Text>;

  const newProducts = data.filter(product => product.new === true);

  return (
      <View>
        <CarouselProducts products={newProducts}/>
      </View>
  )
}

export default Home

const styles = StyleSheet.create({})