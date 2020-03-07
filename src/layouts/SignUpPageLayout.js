import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import SignUpFooter from "../components/layout/SignUpFooter";

const SignUpPageLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col className="main-content p-0" lg="12" md="12" sm="12" tag="main">
        {children}
      </Col>
      <SignUpFooter/>
    </Row>
  </Container>
);

SignUpPageLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

SignUpPageLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default SignUpPageLayout;
