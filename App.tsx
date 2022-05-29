import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import MainContainer from './components/navigation/MainContainer';

export default function App() {
  return (
    <WalletConnectProvider
      redirectUrl={Platform.OS === 'web' ? window.location.origin : 'tapped://'}
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      <MainContainer />
    </WalletConnectProvider>
  );
}

