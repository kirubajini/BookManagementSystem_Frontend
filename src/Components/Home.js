import React, { Component } from "react";

import Container from "./Container";
import { HomeOutlined } from "@material-ui/icons";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    this.setState({
      content: ""
      
    });
}

  render() {
    return (
      <Container content={this.state.content}/>
    );
  }
}