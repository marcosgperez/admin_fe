import React from "react";
// import { Link } from 'react-router-dom';
import { Row, Col, Card } from "react-bootstrap";

import PageTitle from "../../../layouts/PageTitle";

import BarChartNoPadding from "./BarChartNoPadding";
import NagetivePositive from "./PositiveNagative2";
import TinyLineChart from "./TinyLineChart";
import LegendEffectOpacity from "./LegendEffectOpacity";

function RechartJs() {
  return (
    <>
      <PageTitle motherMenu="Charts" activeMenu="ReChartJs" />
      <Row>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Avarege review</h4>
            </Card.Header>
            <Card.Body>
              <BarChartNoPadding />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Complaints</h4>
            </Card.Header>
            <Card.Body>
              <BarChartNoPadding />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Tasks not finished on time</h4>
            </Card.Header>
            <Card.Body>
              <TinyLineChart />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Tasks not received properly</h4>
            </Card.Header>
            <Card.Body>
              <LegendEffectOpacity />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default RechartJs;
