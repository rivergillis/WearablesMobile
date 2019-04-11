import React, { Component } from "react";
import {
  H2,
  View,
  Text,
  Container,
  Content,
  Card,
  CardItem,
  Right,
  Icon
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleHeader from "./common/SimpleHeader";

class ManageDevice extends Component {
  renderReader = reader => {
    return (
      <Card key={reader}>
        <CardItem>
          <Text>{reader}</Text>
          <Right>
            <View>
              <Icon type="FontAwesome" name="trash-o" />
            </View>
          </Right>
        </CardItem>
      </Card>
    );
  };

  render() {
    const { navigation } = this.props;
    const device = navigation.getParam("device", null);
    if (!device) {
      return <Text>Waiting for device...</Text>;
    }

    const { readers } = device;
    const readersText =
      readers.length <= 0
        ? "No readers for this device."
        : "Users with access to read this device:";
    console.log(readers);

    return (
      <Container>
        <SimpleHeader title="Manage" isBack navigation={navigation} />
        <Content>
          <H2 style={{ textAlign: "center" }}>{device.name}</H2>
          <Text style={{ textAlign: "center" }}>ID: {device._id}</Text>
          <Text style={{ paddingTop: "5%", textAlign: "center" }}>
            {readersText}
          </Text>
          {readers.map(this.renderReader)}
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

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(DeviceActions, dispatch);
// }

export default connect(
  mapStateToProps,
  null
)(ManageDevice);
