import {DarkTheme} from '@react-navigation/native';

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'black',
    backgroundColor: 'black',
    primary: 'white',
    text: 'white',
  },
};
