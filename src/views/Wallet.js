import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col
} from "shards-react";

import DappsNo from "../components/components-overview/Wallet";
import Announcements from "../components/components-overview/Announcements";

export default class Dapps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      text: "Verify Now",
      dapps: []
    };
  }

  render() {
    const { open } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <DappsNo />
          </Col>

          {/* Discussions */}
          <Col lg="4" md="12" sm="12" className="mb-4">
            <Announcements />
          </Col>
        </Row>
      </Container>
    );
  }
}

Dapps.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};