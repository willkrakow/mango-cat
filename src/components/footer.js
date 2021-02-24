import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'


export default function Footer() {
    return (
      <footer>
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col xs={10} md={6}>
              <p className="text-muted text-center">
                Proudly made by my papa. Check him out at{" "}
                <a
                  href="https://williamkrakow.dev"
                  alt="William Krakow | Developer"
                >
                  williamkrakow.dev
                </a>
              </p>
              <p className="text-center text-muted">© William Krakow {new Date().getFullYear()}</p>
            </Col>
          </Row>
        </Container>
      </footer>
    )
}