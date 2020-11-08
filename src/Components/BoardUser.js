import React, { Component } from "react";

import Container from "./Container";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
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