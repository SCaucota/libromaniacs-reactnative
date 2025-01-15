import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CardCategory from './CardCategory'
import { useGetCategoriesQuery } from '../services/shop'

const Categories = () => {

    const {data} = useGetCategoriesQuery();

  return (
    <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({item}) => <CardCategory category={item}/>}
    />
  )
}

export default Categories