import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";

import CableParkList from "./CableParkList";

class Home extends Component {
  state = {
    cableparks: []
  };

  componentDidMount() {
    this.resetState();
  }

  getCableParks = () => {
    axios.get("http://127.0.0.1:8000/cableparks/").then(res => this.setState({ cableparks: res.data }));
  };

  resetState = () => {
    this.getCableParks();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <CableParkList
              cableparks={this.state.cableparks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;