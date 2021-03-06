import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {lightTheme} from './themes/light';
import {AuthContext} from './contexts/AuthContext';
import {MainStackNavigator} from './navigators/MainStackNavigator';
import {useAuth} from './hooks/useAuth';
import {UserContext} from './contexts/UserContext';
import {SplashScreen} from './screens/SplashScreen';
import {darkTheme} from './themes/dark';
import {ThemeContext} from './contexts/ThemeContext';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
// import {useDarkMode} from 'react-native-dark-mode';

const RootStack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3A66FF',
  },
};

export default function () {
  const {auth, state} = useAuth();
  // const isDarkMode = useDarkMode();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const switchTheme = React.useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
    return state.user ? (
      <RootStack.Screen name={'MainStack'}>
        {() => (
          <UserContext.Provider value={state.user}>
            <MainStackNavigator />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    );
  }

  return (
    <ThemeContext.Provider value={(switchTheme, MyTheme)}>
      <StatusBar
        backgroundColor={isDarkMode ? 'white' : 'black'}
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
      />
      <AuthContext.Provider value={auth}>
        <PaperProvider>
          <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: false,
              }}>
              {renderScreens()}
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
