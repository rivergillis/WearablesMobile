import React, { Component } from "react";
import { Text, View } from "native-base";

class ManageDevice extends Component {
  render() {
    const { navigation } = this.props;
    const deviceId = navigation.getParam("deviceId", null);

    return <Text>{deviceId}</Text>;
  }
}

export default ManageDevice;
