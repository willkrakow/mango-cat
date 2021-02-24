import React from 'react'
import Layout from '../components/layout'
import { Container, Row, Col } from 'react-bootstrap'


export default function Thanks() {
    return (
      <Layout>
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <h2 className="text-center display-4 text-dark">Thank you!</h2>
              <h3 className="text-center text-secondary">
                My parents, Laura and Will, got your message and will be in
                touch shortly. If anything comes up, feel free to give them a
                call.
              </h3>
              <p className="text-center text-dark">
                <span className="font-weight-bold">Will</span> – (919) 923-9882
              </p>
              <p className="text-center text-dark">
                <span className="font-weight-bold">Laura</span> – (919) 725-1099
              </p>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
}
