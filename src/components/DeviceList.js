import React, { Component } from "react";
import { View, Text, Container, Content } from "native-base";
import SimpleHeader from "./common/SimpleHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as DeviceActions from "../actions/devices";

class DeviceList extends Component {
  componentDidMount = () => {
    this.updateDevices();
  };

  // TODO: we want to do this on a timer. Check the source for react-native-timeago to see how
  updateDevices = () => {
    const { auth, fetchDevices } = this.props;
    fetchDevices(auth.userToken);
  };

  render() {
    const { devices } = this.props;
    console.log(devices);
    return (
      <Container>
        <Content>
          <SimpleHeader title="Your Devices" />
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
