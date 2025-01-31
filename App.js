import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Navigator from './src/navigation/Navigator';
import {store} from './src/store/index';
import { useFonts } from 'expo-font';
import { fonts } from './src/globals/fonts';

export default function App() {

  const [fontsLoaded] = useFonts(fonts)

  if(!fontsLoaded) {
    return null
  }

  return (
    <>
      <Provider store={store}>
        <Navigator />
      </Provider>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});
