// navigation/AppNavigator.js

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/login';
import { DashBoard } from '../screens/dashBoard';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={DashBoard}
                    options={{ title: 'Dashboard' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
