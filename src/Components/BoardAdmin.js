import React, { Component } from "react";

import Container from "./Container";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
        this.setState({
          content: "Add Book"
        });
  }

  render() {
    return (
      <Container content={this.state.content}/>
    );
  }
}