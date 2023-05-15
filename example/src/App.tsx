import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { dispatch, dispatchOnMainThread } from 'react-native-thread-support';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    dispatch(() => {
    
      // Do long running task on background such as requesting api task, querying local sqlite database task...)
      let multiple = 0;
      for (let i = 0; i < 10; i++) {
        multiple = multiple === 0 ? i+1 : multiple * (i+1);
      }
      
      dispatchOnMainThread(() => {
        // Do ui task
        setResult(multiple);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
