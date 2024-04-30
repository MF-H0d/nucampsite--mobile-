import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { CheckBox, Input, Button, Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";

const LoginTab = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = () => {
    console.log(username);
    console.log(password);
    console.log(remember);
    if (remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username,
          password,
        })
      ).catch((error) => console.error("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("could not delete user info", error)
      );
    }
  };

  useEffect(() => {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        setUsername(userinfo.username);
        setPassword(userinfo.password);
        setRemember(true);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(text) => setUsername(text)}
        value={username}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <CheckBox
        title="Remember Me"
        center
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button
          title="Login"
          onPress={() => handleLogin()}
          color="#5637DD"
          buttonStyle={{ backgroundColor: "#5637DD" }}
          icon={
            <Icon
              name="sign-in"
              type="font-awesome"
              color="#fff"
              iconStyle={{ marginRight: 10 }}
            />
          }
        />
      </View>
      <View style={styles.formButton}>
        <Button
          title="Register"
          titleStyle={{ color: "blue" }}
          onPress={() => navigation.navigate("Register")}
          type="clear"
          buttonStyle={{ backgroundColor: "#5637DD" }}
          icon={
            <Icon
              name="user-plus"
              type="font-awesome"
              color="blue"
              iconStyle={{ marginRight: 10 }}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const RegisterTab = () => {
  return <ScrollView></ScrollView>;
};

const Tab = createBottomTabNavigator();

const LoginScreen = () => {
  const tabBarOptions = {
    activeBackgroundColor: "#5637DD",
    inactiveBackgroundColor: "#CEC8FF",
    activeTintColor: "#fff",
    inactiveTintColor: "#808080",
    labelStyle: { fontSize: 16 },
  };
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Login"
        component={LoginTab}
        options={{
          tabBarIcon: (props) => {
            return (
              <Icon name="sign-in" type="font-awesome" color={props.color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterTab}
        options={{
          tabBarIcon: (props) => {
            return (
              <Icon name="user-plus" type="font-awesome" color={props.color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    padding: 10,
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null,
  },
  formButton: {
    margin: 40,
  },
});

export default LoginScreen;
