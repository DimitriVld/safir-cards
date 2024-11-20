import { 
  View,
  SafeAreaView,
  Text, 
} from 'react-native';
import React, { useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import listCard from '../data/cards.json';

type RootStackParamList = {
  CardScreen: { cardId: number };
};

type CardScreenRouteProp = RouteProp<RootStackParamList, 'CardScreen'>;

type CardScreen = {
  id: number;
  title: string;
  overview: string;
};

export default function CardScreen(): React.JSX.Element {
  const route = useRoute<CardScreenRouteProp>();
  const { cardId } = route.params;
  
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState<Card | null>(listCard.filter(card => card.id === cardId)[0]);

  console.log(card)

  return (
    <SafeAreaView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          {card ? (
            <>
              <Text>{card.name}</Text>
              <Text>{card.id}</Text>
            </>
          ) : (
            <Text>No movie data</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}