import React, { Component } from "react";
import History from './history'
import Payment from './payment'
import SideBar from './sideBar'
import { DrawerNavigator, StackNavigator } from "react-navigation";

const HomeScreenRouter = StackNavigator(
  {
    Sidebar: {screen: Sidebar},
    Payment: { screen: Payment },
    History: { screen: History }
  },
  {
    contentComponent: props => <SideBar props = {...this.props} />
  }
);
