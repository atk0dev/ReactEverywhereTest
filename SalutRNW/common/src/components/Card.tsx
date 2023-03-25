import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

interface Props {
  text: string;
  color?: string;
  onButtonClick: (data: string) => void; 
}

export const Card: React.FC<Props> = ({text, color, onButtonClick}) => {
  return (
    <View style={[styles.card, {backgroundColor: color}]}>
      <Text>{text}</Text>
      <Button title="Click" onPress={() => onButtonClick('result 123')}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'yellow'
  }
});