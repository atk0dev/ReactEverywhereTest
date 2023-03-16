import { observer } from "mobx-react-lite";
import React from "react"
import { View, Text, Button } from "react-native"
import { RootStoreContext } from "../stores/RootStore";

interface Props {}

export const UserInfo: React.FC<Props> = observer(() => {

  const rootStore = React.useContext(RootStoreContext);

  const handleLogout = () => {
    rootStore.authStore.logout();
    rootStore.routerStore.changeScreen(
      'Login'
    );
  }

  return (
    <View>
      <Text>User info</Text>
      <Text>Id: {rootStore.authStore.userId}</Text>
      <Text>Email: {rootStore.authStore.userEmail}</Text>
      
      <Button
				title='Logout'
				onPress={() => {
					handleLogout()
				}}
			/>
    </View>
  )
});