import React from "react";
import { Container, Row, Col } from "shards-react";

import MainSidebar from "../components/layout/MainSidebar/MainSidebar";

const GraphLayout = ({ children }) => (
  <Container fluid>
    <Row>
      <Col>
        {children}
      </Col>
    </Row>
  </Container>
);

export default GraphLayout;
