import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../services/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';

const Login = () => {

    const [email, setEmail] = useState("lola@gmail.com");
    const [password, setPassword] = useState("Lolita12");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [trigger] = useLoginMutation()
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const onSubmit = async () => {
      try {
        const response = await trigger({email, password})
        const user = {
          email:response.data.email,
          idToken:response.data.idToken,
          localId:response.data.localId
        }
        dispatch(setUser(user))
      } catch (error) {
        switch(error.path){
          case 'email':
            setEmailError(error.message)
            setPasswordError('')
            break
          case 'password':
            setPasswordError(error.message)
            setEmailError('')
            break
        }
      }
    }

  return (
    <View>
      <View>
        <Text>Ingresar</Text>
        <InputForm
            label="Email"
            value={email}
            onChangeText={(t) => setEmail(t)}
            isSecure={false}
            error={emailError}
        />
        <InputForm
            label="Password"
            value={password}
            onChangeText={(t) => setPassword(t)}
            isSecure={true}
            error={passwordError}
        />
        <SubmitButton onPress={onSubmit} title="Ingresar"/>
        <Text>No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text>Registrarse</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})