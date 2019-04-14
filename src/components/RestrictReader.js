import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Fab,
  Icon,
  Button,
  View
} from "native-base";
import { connect } from "react-redux";

import SimpleHeader from "./common/SimpleHeader";

class RestrictReader extends Component {
  state = {
    startedForm: false
  };

  renderNewRestrictionForm = () => {
    return (
      <View>
        <Text>Hey</Text>
        <Button onPress={() => this.setState({ startedForm: false })}>
          <Text>Cancel</Text>
        </Button>
      </View>
    );
  };

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
    const { startedForm } = this.state;

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
            {startedForm && this.renderNewRestrictionForm()}
            {!startedForm && (
              <Text>No restrictions found for reader {readerEmail}</Text>
            )}
          </Content>
          <Fab
            position="bottomRight"
            containerStyle={{}}
            style={{ backgroundColor: "#e21d16" }}
            onPress={() => this.setState({ startedForm: true })}
          >
            <Icon name="md-create" />
          </Fab>
        </Container>
      );
    }

    return (
      <Container>
        <SimpleHeader title="Restrictions" isBack navigation={navigation} />
        <Content>
          {startedForm && this.renderNewRestrictionForm()}
          {restrictions.map(this.renderRestriction)}
        </Content>
        <Fab
          position="bottomRight"
          containerStyle={{}}
          style={{ backgroundColor: "#e21d16" }}
          onPress={() => this.setState({ startedForm: true })}
        >
          <Icon name="md-create" />
        </Fab>
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