import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});

const SignIn: React.FC = () => {
  const {signIn_context} = useAuth();

  //console.log('Entrou SignIn');
  //console.log(signed);
  //console.log(user);

  function handleSignIn() {
    signIn_context();
  }

  /*
  async function handleSignIn() {
    //email, password
    const response = await signIn();
    console.log(response);
  }
  */

  /*
  function handleSignIn() {
    //email, password
    signIn().then((response) => {
      console.log(response);
    });
  }
  */

  return (
    <View style={styles.container}>
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;
