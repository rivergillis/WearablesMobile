import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
  Toast,
  View
} from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SimpleHeader from "./common/SimpleHeader";

import * as AuthActions from "../actions/auth";

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  buttonToolbar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 80,
    paddingRight: 80
  }
});

class LoginPage extends Component {
  state = {
    email: "test@test.com",
    password: "password"
  };

  componentDidUpdate = () => {
    const { auth, ackLoginFail } = this.props;
    if (auth.userToken) {
      const { navigation } = this.props;
      navigation.navigate("DeviceList");
    } else if (auth.failedLogin) {
      Toast.show({ text: "Login failed!", buttonText: "Okay" });
      ackLoginFail();
    }
  };

  onLoginPress = () => {
    const { loginUser } = this.props;
    const { email, password } = this.state;
    loginUser(email, password);
  };

  onSignupPress = () => {
    const { navigation } = this.props;
    navigation.navigate("Signup");
  };

  render() {
    const { email, password } = this.state;
    const { auth } = this.props;

    const loginText = auth.loggingIn ? "Logging in..." : "Log in";

    return (
      <Container>
        <SimpleHeader title="Login" />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                value={email}
                onChangeText={text => this.setState({ email: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={password}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
          </Form>

          <View style={styles.buttonToolbar}>
            <Button onPress={this.onLoginPress} disabled={auth.loggingIn}>
              <Text>{loginText}</Text>
            </Button>

            <Button
              bordered
              onPress={this.onSignupPress}
              disabled={auth.loggingIn}
            >
              <Text>Sign up</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.AuthReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
