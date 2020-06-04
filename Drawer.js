import React from "react";
import { Image, StyleSheet } from "react-native";
import { Block, Text, Button } from "expo-ui-kit";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

//import the screens
import Dashboard from "./screens/Dashboard";
import Messages from "./screens/Messages";
import Contact from "./screens/Contact";

import { Feather, AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

import { LinearGradient } from "expo-linear-gradient";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={[{ flex: 1, overflow: "hidden" }, style]}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <Button
              transparent
              marginHorizontal
              padding
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" size={18} />
            </Button>
          ),
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1}}>
      <Block>
        <Block flex={0.4} margin={20} bottom>
          {/* add avatar */}
          <Image
            source={{
              uri:
                "https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png",
              height: 60,
              width: 60,
            }}
            resizeMode="center"
            style={{ borderRadius: 60 }}
          />
          <Text white title marginTop="2x">
            React UI Kit
          </Text>
          <Text white size={9} marginTop>
            contact@react-ui-kit.com
          </Text>
        </Block>
        {/* add icons to items */}
        <Block>
          <DrawerItem
            label="Dashboard"
            labelStyle={{ color: "white",marginLeft: -16 }}
            onPress={() => props.navigation.navigate("Dashboard")}
            icon={() => <AntDesign name="dashboard" size={16} color="white"/>}
          />
          <DrawerItem
            label="Messages"
            labelStyle={{ color: "white",marginLeft: -16 }}
            onPress={() => props.navigation.navigate("Messages")}
            icon={() => <AntDesign name="message1" size={16} color="white"/>}
          />
          <DrawerItem
            label="Contact"
            labelStyle={{ color: "white",marginLeft: -16 }}
            onPress={() => props.navigation.navigate("Contact")}
            icon={() => <AntDesign name="phone" size={16} color="white"/>}
          />
        </Block>
        <Block noflex top>
        <DrawerItem
            label="Logout"
            labelStyle={{ color: "white",marginLeft: -16 }}
            onPress={() => alert("Are you sure to logout?")}
            icon={() => <AntDesign name="logout" size={16} color="white"/>}
          />

           
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  // create animation for scale
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  // animate the borderRadius of the scene screens
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const screenStyles = { borderRadius, transform: [{ scale }] };
  return (
    <LinearGradient style={{ flex: 1 }} colors={["red", "blue"]}>
      <Drawer.Navigator
        // the drawer -> screen animated should be slide
        drawerType="slide"
        initialRouteName="Dashboard"
        overlayColor="transparent"
        drawerStyle={{ width: "50%", backgroundColor: "transparent" }}
        // contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "green",
          inactiveTintColor: "green",
        }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}
      >
        <Drawer.Screen name="Screens">
          {(props) => <Screens {...props} style={screenStyles} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};
