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

// Render the reader restrictions component.
// Includes a form for users to add new restrictions,
// and displays a list of current restrictions.
class RestrictReader extends Component {
  state = {
    startedForm: false
  };

  renderNewRestrictionForm = () => {
    return (
      <View>
        <Text>TODO: put the new restriction form here</Text>
        <Button onPress={() => this.setState({ startedForm: false })}>
          <Text>Cancel</Text>
        </Button>
      </View>
    );
  };

  // Renders a restriction card.
  renderRestriction = (restriction, resIdx) => {
    const key = `res${resIdx}`;
    const {
      thresholdHigh,
      thresholdLow,
      property,
      roundToNearest,
      fuzz,
      weekDays,
      timeBegin,
      timeEnd
    } = restriction;
    const hasRoundToNearest = roundToNearest !== undefined;
    const hasFuzz = fuzz !== undefined;
    const hasTimeBegin = timeBegin !== undefined;
    const hasTimeEnd = timeEnd !== undefined;
    return (
      <Card key={key}>
        <CardItem>
          <Body>
            {thresholdLow && (
              <Text>Affects values more than {thresholdLow}</Text>
            )}
            {thresholdHigh && (
              <Text>Affects values less than {thresholdHigh}</Text>
            )}
            {property && <Text>Affects property '{property}'</Text>}
            {!property && <Text>Affects all properties</Text>}
            {hasRoundToNearest && (
              <Text>Round value to nearest {roundToNearest}</Text>
            )}
            {hasFuzz && <Text>Fuzz value by {fuzz}</Text>}
            {weekDays && weekDays.length >= 1 && (
              <Text>Occurs on weekdays {weekDays.toString()}</Text>
            )}
            {hasTimeBegin && <Text>Occurs {timeBegin} ms after midnight</Text>}
            {hasTimeEnd && (
              <Text>Stops occuring {timeEnd} ms after midnight</Text>
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

export default connect(
  mapStateToProps,
  null
)(RestrictReader);
