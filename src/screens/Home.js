import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../services/shop';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import BooksList from '../components/BookList';
import { globalStyles } from '../globals/styles';

const Home = () => {

  const { data, isLoading, error, refetch } = useGetProductsQuery();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(data) {
      setProducts(Object.values(data))
      refetch()
    }
  }, [data])

  if (isLoading) {
    return <View style={globalStyles.centerComponent}><Spinner/></View>
  }

  if (error) {
    return <Message message='Error al cargar los productos'/>;
  }

  const newProducts = products.filter(item => item.new === true)
  const popularProducts = products.filter(item => item.rating >= 4.5)
  const autumBooks = products.filter(item => item.season === 'otoño')
  const movieAdaptedBooks = products.filter(item => item.movieAdaptation === true)

  return (
      <ScrollView>
          <BooksList title='Recién Llegados' data={newProducts}/>
          <BooksList title='Populares' data={popularProducts}/>
          <BooksList title='Otoño' data={autumBooks}/>
          <BooksList title='Libros adaptados a películas' data={movieAdaptedBooks}/>
      </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})