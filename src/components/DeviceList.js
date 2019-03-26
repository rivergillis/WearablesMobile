import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  CardItem,
  Body,
  Text,
  H2,
  Container,
  Content
} from "native-base";
import SimpleHeader from "./common/SimpleHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as DeviceActions from "../actions/devices";

const styles = StyleSheet.create({
  headerStyle: {
    textAlign: "center"
  }
});

class DeviceList extends Component {
  componentDidMount = () => {
    this.updateDevices();
  };

  // TODO: we want to do this on a timer. Check the source for react-native-timeago to see how
  updateDevices = () => {
    const { auth, fetchDevices } = this.props;
    fetchDevices(auth.userToken);
  };

  renderDevice = device => {
    const data = device.payload
      ? JSON.stringify(device.payload)
      : "No payload available";
    return (
      <Card key={device._id}>
        <CardItem header>
          <Text>{device.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{data}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  };

  render() {
    const { devices } = this.props;
    console.log(devices);
    return (
      <Container>
        <Content>
          <SimpleHeader title="Your Devices" />
          <H2 style={styles.headerStyle}>Devices you own</H2>
          {devices.ownedDevices.map(this.renderDevice)}
          <H2 style={styles.headerStyle}>Devices you can read</H2>
          {devices.readDevices.map(this.renderDevice)}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.AuthReducer,
    devices: state.DevicesReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DeviceActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceList);
