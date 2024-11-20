import { 
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import listCard from '../data/cards.json';

import { useNavigation } from '@react-navigation/native';

type Card = {
  id: number;
  title: string;
};

type ItemProps = {
  id: number;
  title: string;
  navigation: any;
};

const ItemCard = ({id, title, navigation}: ItemProps) => (
  <View>
    <Button
      title={title}
      onPress={() =>
        navigation.navigate('CardScreen', { cardId: id })
      }
    />
  </View>
);

export default function ListCardsScreen(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>(listCard);
  const navigation = useNavigation();

  const search = (value) => {
    if (value === "") {
      setCards(listCard)
    } else {
      let filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(value.toLowerCase())
      )
      setCards(filteredCards)
    }
  }

  return (
    <SafeAreaView>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={search}
        placeholder="Search"
      />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : cards.length > 0 ? (
        <FlatList
          data={cards}
          renderItem={({item}) => <ItemCard id={item.id} title={item.name} navigation={navigation} />}
        />
      ) : (
        <Text>No result</Text>
      )}
    </SafeAreaView>
  );
}