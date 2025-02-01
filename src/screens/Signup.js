import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { useSignUpMutation } from "../services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { signupSchema } from "../validations/signupSchema";
import { deleteSession, insertSession } from "../config/dbSQL";
import { colors } from "../globals/colors";
import { globalStyles } from "../globals/styles";
import Entypo from "react-native-vector-icons/Entypo";
import Spinner from "../components/Spinner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [trigger] = useSignUpMutation();
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onSubmit = async () => {
    setLoading(true);
    try {
      signupSchema.validateSync({ email, password, confirmPassword });
      const response = await trigger({ email, password }).unwrap();;
      const user = {
        email: response.data.email,
        idToken: response.data.idToken,
        localId: response.data.localId,
      };
      dispatch(setUser(user));
      await deleteSession();
      await insertSession(user.localId, user.email, user.idToken);
    } catch (error) {
      setLoading(false);

      if (error.data?.error?.message === "EMAIL_EXISTS") {
        setPasswordError('')
        setEmailError(
          "Este email ya está registrado. Usa otro o inicia sesión."
        );
        return;
      }
      
      switch (error.path) {
        case "email":
          setEmailError(error.message);
          setPasswordError("");
          setConfirmPasswordError("");
          break;
        case "password":
          setPasswordError(error.message);
          setEmailError("");
          setConfirmPasswordError("");
          break;
        case "confirmPassword":
          setConfirmPasswordError(error.message);
          setEmailError("");
          setPasswordError("");
          break;
      }
    }
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Entypo
          name="arrow-with-circle-left"
          size={35}
          color={colors.secondary}
        />
        <Text style={styles.btnText}>Volver a Ingresar</Text>
      </Pressable>
      <View style={styles.formContainer}>
        <Text
          style={[
            globalStyles.title,
            { color: colors.primary, paddingTop: 25, paddingBottom: 5 },
          ]}
        >
          Registro
        </Text>
        <View style={styles.inputsContainer}>
          <InputForm
            label="email"
            value={email}
            onChangeText={(t) => setEmail(t)}
            isSecure={false}
            error={emailError}
            icon="mail"
          />
          <InputForm
            label="contraseña"
            value={password}
            onChangeText={(t) => setPassword(t)}
            isSecure={true}
            error={passwordError}
            icon="lock"
          />
          <InputForm
            label="confirmar contraseña"
            value={confirmPassword}
            onChangeText={(t) => setConfirmPassword(t)}
            isSecure={true}
            error={confirmPasswordError}
            icon="lock"
          />
        </View>
        {loading ? (
          <Spinner />
        ) : (
          <SubmitButton title="Registrarse" onPress={onSubmit} />
        )}
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "flex-end",
    height: "100%",
  },
  formContainer: {
    backgroundColor: colors.secondary,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    height: 500,
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    gap: 20,
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 15,
    gap: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  btnText: {
    color: colors.secondary,
    fontSize: 18,
  },
});
