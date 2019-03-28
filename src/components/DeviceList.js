import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  Card,
  CardItem,
  Body,
  Text,
  H2,
  Container,
  Content,
  View
} from "native-base";
import SimpleHeader from "./common/SimpleHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as DeviceActions from "../actions/devices";

import LineChart from "react-native-responsive-linechart";

const styles = StyleSheet.create({
  headerStyle: {
    textAlign: "center"
  }
});

const makeRandomArray = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * Math.floor(10)));
  }
  return arr;
};

class DeviceList extends Component {
  state = { timer: null, randomLineData: [10, -15, 11, 2] };

  componentDidMount = () => {
    // this.updateDevices();
    this.createDataUpdateTimer();
  };

  createDataUpdateTimer = () => {
    this.setState({
      timer: setTimeout(() => {
        this.updateDevices();
      }, 2000)
    });
  };

  componentWillUnmount = () => {
    clearTimeout(this.state.timer);
  };

  updateDevices = () => {
    const { auth, fetchDevices } = this.props;
    fetchDevices(auth.userToken);
    // this.forceUpdate(); // TODO: needed?
    this.setState({ randomLineData: makeRandomArray() });
    this.createDataUpdateTimer();
  };

  renderPayloadData = (payloadProperty, propertyName) => {
    const { value, units } = payloadProperty;
    return (
      <View key={propertyName}>
        <CardItem>
          <Body>
            <Text>{`${propertyName}: ${value} ${units}`}</Text>
          </Body>
        </CardItem>
        {/* TODO: USE REAL DATA FOR THIS */}
        <View
          style={{
            margin: 10,
            height: 100,
            backgroundColor: "#fff"
          }}
        >
          <LineChart
            style={{ flex: 1 }}
            config={{ yAxis: { visible: false } }}
            data={this.state.randomLineData}
          />
        </View>
      </View>
    );
  };

  renderDevice = device => {
    const { lastPayload } = device;
    // If we don't have a payload yet, let the user know.
    if (!lastPayload || lastPayload.length <= 0) {
      return (
        <Card key={device._id}>
          <CardItem header>
            <Text>{device.name}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Awaiting intial payload</Text>
            </Body>
          </CardItem>
        </Card>
      );
    }

    // If we have a payload, display each property and give it a graph.
    return (
      <Card key={device._id}>
        <CardItem header>
          <Text>{device.name}</Text>
        </CardItem>
        {Object.keys(lastPayload).map(key =>
          this.renderPayloadData(lastPayload[key], key)
        )}
      </Card>
    );
  };

  render() {
    const { devices } = this.props;
    console.log(devices);
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <SimpleHeader title="Your Devices" />
          <Content style={{ height: "100%", flex: 1 }}>
            <H2 style={styles.headerStyle}>Devices you own</H2>
            {devices.ownedDevices.map(this.renderDevice)}
            <H2 style={styles.headerStyle}>Devices you can read</H2>
            {devices.readDevices.map(this.renderDevice)}
          </Content>
        </View>
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
