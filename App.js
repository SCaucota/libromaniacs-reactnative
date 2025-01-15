import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Navigator from './src/navigation/Navigator';
import {store} from './src/store/index';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Navigator />
      </Provider>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
