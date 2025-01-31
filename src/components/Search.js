import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import InputForm from '../components/InputForm'
import Entypo from 'react-native-vector-icons/Entypo'
import { colors } from '../globals/colors';

const Search = ({onSearch}) => {
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('')

    const search = () => {
      const regrex = /[+\-*/%@#&]/

      if(regrex.test(searchText)){
        return setError('Libro no encontrado')
      }
      setError('')
      onSearch(searchText)
    }

    const removeSearch = () => {
      onSearch('')
      setSearchText('')
      setError('')
    }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputForm
          label='Buscar'
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          inSecure={false}
          styleAdded={styles.input}
        />
        <Pressable style={styles.search} onPress={search}>
          <Entypo name='magnifying-glass' size={30} color={colors.primaryClear}/>
        </Pressable>
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    alignItems: 'center',
    marginVertical: 15,
  },
  inputContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%'
  },
  input:{
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: colors.secondary
  },
  search:{
    backgroundColor: colors.secondary,
    height: 58,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingRight: 10
  }
})