import React, { useState, useEffect } from "react";
import PrimerPanel from "./Componentes/chars/verticalChar";
import "./App.css";
import { db } from "./servicios/firebase";
import { useDispatch, useSelector } from "react-redux";
import leer from "./procesamiento";

import {
  fnAsignarDatos1,
  fnAsignarDatos2,
  fnAsignarDatos3,
  fnAsignarDatos4,
  fnAsignarMensaje,
  selectDatos1,
  selectDatos2,
  selectDatos3,
  selectDatos4,
  selectMensaje,
} from "./redux/app/appSlice";

import "firebase/auth";
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  ListGroup,
  Navbar,
} from "react-bootstrap";

const MensajeCargando = () => {
  const [mensaje, setMensaje] = useState(true);

  let miMensaje = useSelector(selectMensaje);
  return (
    <Container
      style={{
        position: "absolute",
        alignContent: "center",
        marginBottom: "30px",
      }}
    >
      {mensaje ? (
        <Card>
          <Card.Header as="h5">Mensaje</Card.Header>
          <Card.Body>
            <Card.Title>{miMensaje}</Card.Title>
            <Card.Text>En unos cuantos minutos estaremos listos...</Card.Text>
            {miMensaje == "Nos encontramos cargando los datos..." ? (
              <div></div>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  setMensaje(false);
                }}
              >
                Cerrar
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

const Canva = () => {
  const [datos1, setDatos1] = useState([]);
  const [datos2, setDatos2] = useState([]);
  const [datos3, setDatos3] = useState([]);
  const [datos4, setDatos4] = useState([]);

  const miData_ResponseType = {
    labels: ["Botón1", "Boton2", "Boton3", "Boton4"],
    datasets: [
      {
        label: "Sesión1",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: datos1,
      },
      {
        label: "Sesión2",
        backgroundColor: "rgba(0, 181, 204, 0.4)",
        borderColor: "rgba(0, 181, 204, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 181, 204, 0.4)",
        hoverBorderColor: "rgba(0, 181, 204, 1)",
        data: datos2,
      },
      {
        label: "Sesión3",
        backgroundColor: "rgba(41, 241, 195, 0.4)",
        borderColor: "rgba(41, 241, 195, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(41, 241, 195, 0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: datos3,
      },
      {
        label: "Sesión4",
        backgroundColor: "rgba(247, 202, 24, 0.4)",
        borderColor: "rgba(247, 202, 24, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(247, 202, 24, 0.4)",
        hoverBorderColor: "rgba(247, 202, 24, 1)",
        data: datos4,
      },
    ],
  };

  const asignador = useDispatch(); //Se encarga de asgnar los datos a nuestras variables globales
  const tablaAllData = db.ref("/AllData");
  const tablaMetricos = db.ref("/metricos");

  const escribirDatos = (
    responseTimeVariability,
    responseTime,
    errorComission,
    errorOmission
  ) => {
    tablaMetricos.push({
      ResponseTimeVariability: responseTimeVariability,
      ResponseTime: responseTime,
      ErrorComission: errorComission,
      ErrorOmission: errorOmission,
    });
  };

  const requestDatos = async (objetos) => {
    let dato = leer(objetos);
    let responseType = [dato[0]];
    let comissions = [dato[1]];
    let responseTime = [dato[2]];
    let omission = [dato[3]];

    setDatos1(responseType);
    setDatos2(comissions);
    setDatos3(responseTime);
    setDatos4(omission);
  };

  const crearDatos = async () => {
    try {
      asignador(fnAsignarMensaje("Nos encontramos cargando los datos..."));
      //Escribir información
      await tablaAllData.once("value", function (snapshot) {
        let objetos = [];

        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var data = childSnapshot.val();
          // ...

          let logroDispararle = false;

          if (data.Excorrect == "1") {
            logroDispararle = true;
          }

          objetos.push({
            key: key,
            time: data.Extime,
            correct: logroDispararle,
          });
        });
        console.log(objetos);
        requestDatos(objetos);
      });

      //escribirDatos();
    } catch (error) {
      console.error("No está cargando los datos", error);
    }
  };
  useEffect(() => {
    crearDatos().then(() => {
      asignador(fnAsignarMensaje("Hemos añadido todos los datos!"));
    });
  }, []);

  return (
    <Container>
      <Navbar bg="dark" variant="dark" style={{ marginBottom: "20px" }}>
        <Navbar.Brand href="#home">
          Panel de administradores (Desarrollado por: Víctor Mancera, Ituriel
          Mejia, Salvador Gaytan - Hackeritu)
        </Navbar.Brand>
      </Navbar>
      <Row className="justify-content-md-center">
        <Col style={{ height: "230px" }}>
          <PrimerPanel
            data={miData_ResponseType}
            titulo="Response Time Var"
            className="tabla"
          />
          <PrimerPanel data={miData_ResponseType} titulo="Response Time" />
        </Col>

        <Col style={{ height: "230px" }}>
          <PrimerPanel data={miData_ResponseType} titulo="Comissions" />
          <PrimerPanel data={miData_ResponseType} titulo="Omission" />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Button
          variant="outline-primary"
          className="btn_select"
          onClick={() => {
            crearDatos();
          }}
        >
          Actualizar
        </Button>{" "}
      </Row>
    </Container>
  );
};

function App() {
  return (
    <Container className="App">
      <Canva />
      <MensajeCargando />
    </Container>
  );
}

export default App;
