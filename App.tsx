import 'react-native-get-random-values';
import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DietScreen from './src/screens/DietScreen';
import MoodScreen from './src/screens/MoodScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import DataScreen from './src/screens/DataScreen';
import SleepScreen from './src/screens/SleepScreen';
import {LogBox, Text, TouchableOpacity, View} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  Profile: {userId: string};
  Diet: undefined;
  Mood: undefined;
  Activity: undefined;
  Sleep: undefined;
  Data: undefined;
};

export interface DebugTimeContextProps {
  debugTime: Date | undefined;
  setDebugTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const DebugTimeContext = React.createContext<DebugTimeContextProps>({
  debugTime: undefined,
  setDebugTime: () => {},
});

const App = () => {
  const [debugTime, setDebugTime] = useState<Date | undefined>(undefined);
  const value = {debugTime, setDebugTime};

  return (
    <DebugTimeContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Data')}>
                  <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>Settings</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Diet" component={DietScreen} />
          <Stack.Screen name="Mood" component={MoodScreen} />
          <Stack.Screen name="Activity" component={ActivityScreen} />
          <Stack.Screen name="Sleep" component={SleepScreen} />
          <Stack.Screen name="Data" component={DataScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DebugTimeContext.Provider>
  );
};

export default App;
