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

import PageTitle from "../components/common/PageTitle";
import Colors from "../components/components-overview/Colors";
import SmallOutlineButtons from "../components/components-overview/SmallOutlineButtons";
import NormalOutlineButtons from "../components/components-overview/NormalOutlineButtons";
import Forms from "../components/components-overview/Forms";
import ProgressBars from "../components/components-overview/ProgressBars";

const ComponentsOverview = () => (
  <div>
    <Container fluid className="px-0">
      <Alert className="mb-0">
        <i className="fa fa-info mx-2"></i> How you doin'? I'm just a friendly, good-looking notification message and I come in all the colors you can see below. Pretty cool, huh?
      </Alert>
    </Container>
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Forms & Components"
          subtitle="Overview"
          className="text-sm-left"
        />
      </Row>

      <Colors />

      <Row>
        <Col lg="8" className="mb-4">
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Form Inputs</h6>
            </CardHeader>

            <ListGroup flush>
              <ListGroupItem className="p-0 px-3 pt-3">
                <Row>
                </Row>
              </ListGroupItem>

              <ListGroupItem className="p-3">
                <strong className="text-muted d-block my-2">
                  Small Buttons
                </strong>

                <strong className="text-muted d-block my-2">
                  Small Outline Button
                </strong>
                <SmallOutlineButtons />
              </ListGroupItem>

              <ListGroupItem className="p-3">
                {/* Normal Buttons */}
                <strong className="text-muted d-block my-2">
                  Normal Buttons
                </strong>

                {/* Normal Outline Buttons */}
                <strong className="text-muted d-block my-2">
                  Normal Outline Buttons
                </strong>
                <NormalOutlineButtons />
              </ListGroupItem>

              {/* Forms & Form Validation */}
              <ListGroupItem className="p-3">
                <Row>
                  <Forms />
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>

          {/* Complete Form Example */}
          <Card small>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Form Example</h6>
            </CardHeader>
          </Card>
        </Col>

        <Col lg="4" className="mb-4">
          {/* Sliders & Progress Bars */}
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Sliders & Progress Bars</h6>
            </CardHeader>
            <ListGroup flush>
              <ProgressBars />
            </ListGroup>
          </Card>

          {/* Groups */}
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Groups</h6>
            </CardHeader>

            <ListGroup flush>
              <ListGroupItem className="px-3">
                <Form>
                  <strong className="text-muted d-block mb-3">
                    Button Groups
                  </strong>

                  <strong className="text-muted d-block mb-2">
                    Input Groups
                  </strong>

                  <strong className="text-muted d-block mb-2">
                    Seamless Input Groups
                  </strong>
                </Form>
              </ListGroupItem>
            </ListGroup>
          </Card>

          <Card small>
            {/* Files & Dropdowns */}
            <CardHeader className="border-bottom">
              <h6 className="m-0">Files & Dropdowns</h6>
            </CardHeader>

            <ListGroup flush>
              <ListGroupItem className="px-3">
                <strong className="text-muted d-block mb-2">
                  Custom File Upload
                </strong>

                <strong className="text-muted d-block mb-2">
                  Dropdown Input Groups
                </strong>

                <strong className="text-muted d-block mb-2">
                  Custom Select
                </strong>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ComponentsOverview;
