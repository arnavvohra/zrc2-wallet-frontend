import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  Alert
} from "shards-react";

import LoginForm from "../components/components-overview/LoginForm";

export default class Login extends React.Component {
  componentWillMount() {
    //Clear local storage data from previous login
    localStorage.clear();
  }
  render() {
    return (
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
                <h6 className="m-0">Login</h6>
              </CardHeader>
              <LoginForm />
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}
