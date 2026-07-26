import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// SCREENS
import MapScreen from './app/map';
import MarketScreen from './app/market';
import OrderSuccess from './app/orderSuccess';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="market" component={MarketScreen} />
        <Stack.Screen name="map" component={MapScreen} />
        <Stack.Screen name="orderSuccess" component={OrderSuccess} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
