import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import {
  Card,
  CardItem,
  Body,
  Text,
  H3,
  Container,
  Content,
  View,
  Icon,
  Right,
  Segment,
  Button
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LineChart from "react-native-responsive-linechart";
import { TouchableOpacity } from "react-native-gesture-handler";

import SimpleHeader from "./common/SimpleHeader";
import * as DeviceActions from "../actions/devices";

const styles = StyleSheet.create({
  headerStyle: {
    textAlign: "center"
  }
});

class DeviceList extends Component {
  state = { timer: null, isOwnedActive: true };

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
    this.createDataUpdateTimer();
  };

  onManageDeviceTouch = device => {
    const { navigation } = this.props;
    navigation.navigate("ManageDevice", { deviceId: device._id });
  };

  renderPayloadData = (payloadProperty, propertyName, deviceId, deviceType) => {
    const { devices } = this.props;
    const { value, units } = payloadProperty;
    const graphData =
      deviceType === "owned"
        ? devices.ownedDevicePayloadCache
        : devices.readDevicePayloadCache;
    return (
      <View key={propertyName}>
        <CardItem>
          <Body>
            <Text>{`${propertyName}: ${Math.round(value * 100) /
              100} ${units}`}</Text>
          </Body>
        </CardItem>
        {Platform.OS === "ios" && (
          <View
            style={{
              margin: 10,
              height: 100,
              backgroundColor: "#fff"
            }}
          >
            <LineChart
              style={{ flex: 1 }}
              config={{
                yAxis: { visible: false },
                grid: { visible: false },
                line: { strokeColor: "#be2ddd", strokeWidth: 2 }
              }}
              data={graphData[deviceId][propertyName]}
            />
          </View>
        )}
      </View>
    );
  };

  renderDevice = (device, type) => {
    const { lastPayload } = device;
    // If we don't have a payload yet, let the user know.
    if (!lastPayload || lastPayload.length <= 0) {
      return (
        <Card key={device._id}>
          <CardItem header>
            <Text>{device.name}</Text>
            {type === "owned" && (
              <Right style={{ marginLeft: "30%" }}>
                <TouchableOpacity
                  onPress={() => this.onManageDeviceTouch(device)}
                >
                  <View>
                    <Icon name="md-settings" />
                  </View>
                </TouchableOpacity>
              </Right>
            )}
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
          {type === "owned" && (
            <Right style={{ marginLeft: "30%" }}>
              <TouchableOpacity
                onPress={() => this.onManageDeviceTouch(device)}
              >
                <View>
                  <Icon name="md-settings" />
                </View>
              </TouchableOpacity>
            </Right>
          )}
        </CardItem>
        {Object.keys(lastPayload).map(key =>
          this.renderPayloadData(lastPayload[key], key, device._id, type)
        )}
      </Card>
    );
  };

  render() {
    const { devices } = this.props;
    const { isOwnedActive } = this.state;
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <SimpleHeader title="Your Devices" hasSegment />
          <Segment>
            <Button
              first
              active={isOwnedActive}
              onPress={() => this.setState({ isOwnedActive: true })}
            >
              <Text>Owned</Text>
            </Button>
            <Button
              last
              active={!isOwnedActive}
              onPress={() => this.setState({ isOwnedActive: false })}
            >
              <Text>Readable</Text>
            </Button>
          </Segment>
          <Content style={{ height: "100%", flex: 1 }}>
            {isOwnedActive &&
              devices.ownedDevices.map(dev => this.renderDevice(dev, "owned"))}
            {isOwnedActive && devices.ownedDevices.length <= 0 && (
              <H3 style={styles.headerStyle}>Nothing here (yet).</H3>
            )}
            {!isOwnedActive &&
              devices.readDevices.map(dev => this.renderDevice(dev, "read"))}
            {!isOwnedActive && devices.readDevices.length <= 0 && (
              <H3 style={styles.headerStyle}>Nothing here (yet).</H3>
            )}
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
