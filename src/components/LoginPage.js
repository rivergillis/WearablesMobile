import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
  Toast
} from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SimpleHeader from "./common/SimpleHeader";

import * as AuthActions from "../actions/auth";

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
              <Label>Email or Username</Label>
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
          <Button onPress={this.onLoginPress} disabled={auth.loggingIn}>
            <Text>{loginText}</Text>
          </Button>

          <Button onPress={this.onSignupPress} disabled={auth.loggingIn}>
            <Text>Sign up</Text>
          </Button>
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
