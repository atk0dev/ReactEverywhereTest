import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { Login } from "./screens/Login";
import { UserInfo } from "./screens/UserInfo";
import { RootStoreContext } from "./stores/RootStore";

export const Router = observer(() => {
  
  const rootStore = useContext(RootStoreContext)
  
  return rootStore.routerStore.screen == "Login" ? <Login /> : <UserInfo/>;
});