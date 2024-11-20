import { 
  View,
  Text,
  Button,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPropsList } from '../helpers/propsTypes';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<StackPropsList, 'HomeScreen'>;
};

export default function HomeScreen({navigation}: HomeScreenProps): React.JSX.Element {
  return (
    <View>
      <Text>
        Home 
      </Text>

      <Button
        title="Go to card list"
        onPress={() =>
          navigation.navigate('ListCardsScreen')
        }
      />
    </View>
  );
}