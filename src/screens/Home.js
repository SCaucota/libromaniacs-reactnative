import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useGetProductsQuery } from '../services/shop';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import BooksList from '../components/BookList';
import { globalStyles } from '../globals/styles';

const Home = () => {

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <View style={globalStyles.centerComponent}><Spinner/></View>
  }

  if (error) {
    return <Message message='Error al cargar los productos'/>;
  }

  const newProducts = data.filter(item => item.new === true)
  const popularProducts = data.filter(item => item.rating >= 4.5)
  const autumBooks = data.filter(item => item.season === 'otoño')
  const movieAdaptedBooks = data.filter(item => item.movieAdaptation === true)

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