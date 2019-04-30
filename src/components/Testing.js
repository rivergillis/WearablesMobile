// THIS FILE IS USED TO QUICKLY PROTOTYPE IDEAS
// IGNORE IT.

import React, { Component } from "react";

import LineChart from "react-native-responsive-linechart";
import { Text } from "native-base";
import { View } from "react-native";

const data = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56, 2, 0];
const config = {
  line: {
    strokeWidth: 1,
    strokeColor: "#216D99"
  },
  area: {
    gradientFrom: "#2e86de",
    gradientFromOpacity: 1,
    gradientTo: "#87D3FF",
    gradientToOpacity: 1
  },
  yAxis: {
    labelColor: "#c8d6e5"
  },
  grid: {
    strokeColor: "#c8d6e5",
    stepSize: 30
  },
  insetY: 10,
  insetX: 10,
  interpolation: "spline",
  backgroundColor: "#fff"
};

class Testing extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LineChart style={{ flex: 1 }} config={config} data={data} />
      </View>
    );
  }
}

export default Testing;
