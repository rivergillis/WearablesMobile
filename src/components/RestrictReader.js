import React, { Component } from "react";
import { Container, Content, Text, Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";

import SimpleHeader from "./common/SimpleHeader";

class RestrictReader extends Component {
  renderRestriction = (restriction, resIdx) => {
    const key = `res${resIdx}`;
    const {
      thresholdHigh,
      thresholdLow,
      property,
      roundToNearest
    } = restriction;
    const hasRoundToNearest = roundToNearest !== undefined;
    return (
      <Card key={key}>
        <CardItem>
          <Body>
            {thresholdLow && <Text>Range start: {thresholdLow}</Text>}
            {thresholdHigh && <Text>Range end: {thresholdHigh}</Text>}
            {property && <Text>Affects property '{property}'</Text>}
            {!property && <Text>Affects all properties</Text>}
            {hasRoundToNearest && (
              <Text>Round value to nearest {roundToNearest}</Text>
            )}
          </Body>
        </CardItem>
      </Card>
    );
  };

  render() {
    const { navigation, devices } = this.props;
    const deviceId = navigation.getParam("deviceId", null);
    const readerEmail = navigation.getParam("readerEmail", null);

    const device = devices.ownedDevices.find(d => d._id === deviceId);
    if (!device) {
      return <Text>Waiting for device...</Text>;
    }

    const { readerRestrictions } = device;
    const restrictions = readerRestrictions
      ? readerRestrictions[readerEmail]
      : null;

    if (!restrictions) {
      return (
        <Container>
          <SimpleHeader title="Restrictions" isBack navigation={navigation} />
          <Content>
            <Text>No restrictions found for reader {readerEmail}</Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <SimpleHeader title="Restrictions" isBack navigation={navigation} />
        <Content>{restrictions.map(this.renderRestriction)}</Content>
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
)(RestrictReader);
