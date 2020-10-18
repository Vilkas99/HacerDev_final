import React from "react";
import { Bar } from "react-chartjs-2";
import "../../../App.css";
import { Container, Col, Row, Button, Card, ListGroup } from "react-bootstrap";

const PrimerPanel = ({ data, titulo }) => {
  return (
    <Card className="tabla">
      <Card.Body style={{ height: "300px" }}>
        <h2>{titulo}</h2>
        <Bar
          data={data}
          width={100}
          height={200}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default PrimerPanel;
