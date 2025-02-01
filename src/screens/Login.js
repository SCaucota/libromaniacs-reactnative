import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../services/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import { deleteSesion, insertSession } from '../config/dbSQL';
import Spinner from '../components/Spinner';
import { colors } from '../globals/colors';
import {globalStyles} from '../globals/styles';
import { loginSchema } from '../validations/loginSchema.js';
/* "Lolita12" */
/* "lola@gmail.com" */
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [trigger] = useLoginMutation();
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const onSubmit = async () => {
      setLoading(true);
      try {
        loginSchema.validateSync({email, password})
        const response = await trigger({email, password})
        if (response.error) {
          const firebaseError = response.error?.data?.error?.message;
    
          if (firebaseError === "INVALID_LOGIN_CREDENTIALS") {
            setPasswordError("Email o contraseña incorrectos");
            setEmailError("");
            return;
          } 
        }
        const user = {
          email:response.data.email,
          idToken:response.data.idToken,
          localId:response.data.localId
        }
        dispatch(setUser(user))
        await deleteSesion()
        await insertSession(user.localId, user.email, user.idToken)
      } catch (error) {
        console.log(error.path)
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
    <View style={styles.container}>
      <View>
        <View style={styles.content}>
          <Text style={globalStyles.title}>Hola!</Text>
          <Text style={globalStyles.paragraph}>Bienvenidx a</Text>
          <Text style={styles.brand}>Libromaniacs</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={[globalStyles.title, { color: colors.primary, paddingTop: 25, paddingBottom: 5}]}>Ingresar</Text>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../../assets/images/logo-app.png')}/>
          </View>
          <View style={styles.inputsContainer}>
            <InputForm
                label="email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                isSecure={false}
                error={emailError}
                icon='mail'
            />
            <InputForm
                label="contraseña"
                value={password}
                onChangeText={(t) => setPassword(t)}
                isSecure={true}
                error={passwordError}
                icon='lock'
            />
          </View>
          {loading ? (
                <Spinner/>
            ) : (
                <SubmitButton onPress={onSubmit} title="Iniciar Sesión" />
            )}
            <View style={styles.singUp}>
              <Text style={styles.smallText}>No tienes una cuenta?</Text>
              <Pressable onPress={() => navigation.navigate("Signup")}>
                  <Text style={styles.link}>Registrarse</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%'
  },
  content: {
    justifyContent: 'flex-end',
  },
  brand: {
    color: colors.secondary,
    fontSize: 30,
    paddingLeft: 20,
    marginBottom: 20,
    fontFamily: 'montserrat',
    fontWeight: 'bold',
  },
  imageContainer:{
    width: 120,
    height: 300,
    backgroundColor: colors.primaryClear,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    position: 'absolute',
    top: -250,
    right: 0,
  },
  image:{ 
    height: 100,
    width: 65,
  },
  formContainer:{
    backgroundColor: colors.secondary,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    height: 400,
  },
  inputsContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    gap: 20
  },
  singUp: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallText: {
    fontSize: 16,
  },
  link: {
    color: colors.ternary,
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10
  }
})