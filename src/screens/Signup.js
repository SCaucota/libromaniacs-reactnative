import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import { useSignUpMutation } from '../services/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'
import { signupSchema } from '../validations/signupSchema'

const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [trigger] = useSignUpMutation()
    const dispatch = useDispatch()

    const navigation = useNavigation();

    const onSubmit = async () => {
      try {
        signupSchema.validateSync({email, password, confirmPassword})
        const response = await trigger({email, password})
        const user = {
          email:response.data.email,
          idToken:response.data.idToken
        }
        dispatch(setUser(user))
      } catch (error) {
        console.log(error.path)
        console.log(error.message)
        switch(error.path){
          case'email':
            setEmailError(error.message)
            setPasswordError('')
            setConfirmPasswordError('')
            break
          case 'password':
            setPasswordError(error.message)
            setEmailError('')
            setConfirmPasswordError('')
            break
          case 'confirmPassword':
            setConfirmPasswordError(error.message)
            setEmailError('')
            setPasswordError('')
            break
        }
      }
    }
  return (
    <View>
      <View>
        <Text>Registrarme</Text>
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
        <InputForm
            label="Confirm password"
            value={confirmPassword}
            onChangeText={(t) => setConfirmPassword(t)}
            isSecure={true}
            error={confirmPasswordError}
        />
        <SubmitButton title="Enviar" onPress={onSubmit}/>
        <Text>Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
            <Text>Ingresar</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({})