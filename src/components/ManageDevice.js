import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  H2,
  View,
  Text,
  Container,
  Content,
  Card,
  CardItem,
  Right,
  Icon,
  Body,
  Fab
} from "native-base";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";
import { bindActionCreators } from "redux";
import SimpleHeader from "./common/SimpleHeader";

class ManageDevice extends Component {
  state = {
    addDialogVisible: false,
    readerToDelete: null,
    addReaderEmail: ""
  };

  onDeleteReaderTouch = () => {
    const { readerToDelete } = this.state;
    this.setState({ readerToDelete: null });
    console.log("confrim delete reader touch");
    console.log(readerToDelete);
  };

  onReaderTouch = reader => {
    console.log("reader touch");
    console.log(reader);
  };

  onAddReader = () => {
    this.setState({ addDialogVisible: false });
    const { addReaderEmail } = this.state;
    const loweredEmail = addReaderEmail.toLowerCase();
    console.log(loweredEmail);
  };

  renderReader = reader => {
    return (
      <Card key={reader}>
        <CardItem>
          <Body>
            <TouchableOpacity onPress={() => this.onReaderTouch(reader)}>
              <Text>{reader}</Text>
            </TouchableOpacity>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => this.setState({ readerToDelete: reader })}
            >
              <View>
                <Icon type="FontAwesome" name="trash-o" />
              </View>
            </TouchableOpacity>
          </Right>
        </CardItem>
      </Card>
    );
  };

  render() {
    const { navigation } = this.props;
    const { addDialogVisible, readerToDelete } = this.state;
    const device = navigation.getParam("device", null);
    if (!device) {
      return <Text>Waiting for device...</Text>;
    }

    const { readers } = device;
    const readersText =
      readers.length <= 0
        ? "No readers for this device."
        : "Users with access to read this device:";
    // console.log(readers);

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
        <View>
          <Fab
            position="bottomRight"
            containerStyle={{}}
            style={{ backgroundColor: "#e21d16" }}
            onPress={() => this.setState({ addDialogVisible: true })}
          >
            <Icon name="md-create" />
          </Fab>
        </View>

        <Dialog.Container visible={readerToDelete !== null}>
          <Dialog.Title>Delete reader</Dialog.Title>
          <Dialog.Description>
            {`Are you sure you want to remove ${readerToDelete} from the reader
            list?`}
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({ readerToDelete: null })}
          />
          <Dialog.Button label="Delete" onPress={this.onDeleteReaderTouch} />
        </Dialog.Container>

        <Dialog.Container visible={addDialogVisible}>
          <Dialog.Title>Add reader</Dialog.Title>
          <Dialog.Description>
            Enter the email of the user you want to add as a reader
          </Dialog.Description>
          <Dialog.Input
            lable="Email"
            value={this.state.addReaderEmail}
            onChangeText={text => this.setState({ addReaderEmail: text })}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({ addDialogVisible: false })}
          />
          <Dialog.Button label="Add" onPress={this.onAddReader} />
        </Dialog.Container>
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
