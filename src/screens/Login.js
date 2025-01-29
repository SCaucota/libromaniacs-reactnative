import { Pressable, StyleSheet, Text, View, ActivityIndicator  } from 'react-native'
import React, { useState } from 'react'
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../services/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import { deleteSesion, insertSession } from '../config/dbSQL';

const Login = () => {

    const [email, setEmail] = useState("lola@gmail.com");
    const [password, setPassword] = useState("Lolita12");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [trigger] = useLoginMutation();
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const onSubmit = async () => {
      setLoading(true);
      try {
        const response = await trigger({email, password})
        const user = {
          email:response.data.email,
          idToken:response.data.idToken,
          localId:response.data.localId
        }
        dispatch(setUser(user))
        await deleteSesion()
        await insertSession(user.localId, user.email, user.idToken)
        console.log(response)
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
      }finally{
        setLoading(false);
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
        {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
          ) : (
              <SubmitButton onPress={onSubmit} title="Ingresar" />
          )}
          <Text>No tienes una cuenta?</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.link}>Registrarse</Text>
          </Pressable>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})