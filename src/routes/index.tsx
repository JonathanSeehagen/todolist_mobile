import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {useAuth} from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const {signed, loading} = useAuth();

  if (loading) {
    //RNSplashScreen
    //await new Promise((resolve) => setTimeout(resolve, 2000));

    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#999" />
        </View>
      );
    }
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
