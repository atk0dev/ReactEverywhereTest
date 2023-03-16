import { observer } from "mobx-react-lite";
import React from "react"
import { View, Text, Button } from "react-native"
import { RootStoreContext } from "../stores/RootStore";

interface Props {}

export const Login: React.FC<Props> = observer(() => {

  const rootStore = React.useContext(RootStoreContext);

  const handleLogin = () => {
    console.log('Handle login');
  }

  return (
    <View>
      <Text>Login screen</Text>
      <Button title="User info"
      onPress={() => {
        rootStore.routerStore.changeScreen('UserInfo');
      }} />
      <Button title="Login"
      onPress={() => {
        handleLogin();
      }} />
    </View>

  )
});