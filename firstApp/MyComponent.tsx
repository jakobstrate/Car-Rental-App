import { StyleSheet, Text, View } from 'react-native';

type MyComponentProps = {
  message: string;
};

export default function MyComponent({ message }: MyComponentProps) {
  return (
    <View >
      <Text>Hello World!</Text>
      <Text>{message}</Text>
    </View>
  );
}

