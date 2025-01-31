import {FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CardCategory from './CardCategory'
import { useGetCategoriesQuery } from '../services/shop'

const Categories = () => {

    const {data} = useGetCategoriesQuery();

  return (
    <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({item}) => <CardCategory category={item.name} icon={item.icon}/>}
        columnWrapperStyle={styles.columnWrapper}
    />
  )
}

export default Categories;

const styles = StyleSheet.create({
  columnWrapper:{
    display: 'flex',
    gap: 40,
    justifyContent: 'center',
    marginTop: 30
  }
})