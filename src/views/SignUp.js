import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader} from "shards-react";

import SignUpForm from "../components/components-overview/SignUpForm";

const SignUp = () => (
  <div>
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4" />

      <Row>
        <Col lg="4" className="mb-4 signUpForm">
          <h3>ZRC-2 Wallet</h3>
        </Col>
      </Row>

      <Row>
        <Col lg="4" className="mb-4 signUpForm">
          {/* Complete Form Example */}
          <Card small>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Sign Up</h6>
            </CardHeader>
            <SignUpForm />
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default SignUp;
