import React from "react"
import { Link } from "gatsby"
import { Button, Container, Row, Col } from 'react-bootstrap'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from '../components/image'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Container>
      <Row className="justify-content-center mb-3">
        <Col xs={10} md={6} lg={6}>
          <Image />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={6}>
          <h1>Hi hooman</h1>
          <p>My name is Mango.</p>
          <p>
            I like to hunt bugs and play frogger in the street. If you're here,
            it's probably because you found me doing one of those things. Oops.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={6}>
          <h2>My home</h2>
          <p>
            The WORLD is my home. Okay actually my address is{" "}
            <span className="font-weight-bold text-info">
              231 W Margaret Ln, Hillsborough, NC 27278.
            </span>{" "}
            My parents live there too (I let them–they'd be helpless without me)
            and their names are Will and Laura. They're kinda lame because
            they're my parents but they don't bite.
          </p>
          <h2>What to do with me</h2>
          <div className="ml-2">
            <h3 className="text-info font-weight-bold mb-0">STEP 1</h3>
            <p>Give me petz</p>
            <h3 className="text-info font-weight-bold mb-0">STEP 2</h3>
            <p>
              If it looks like I'm being too good of a hunter or too bad of a
              froggerer, send my parents a message or feel free to swing by our
              home anytime.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={6}>
          <Link to="/contact">
            <Button color="primary" className="w-100 mb-2">
              Send a message to Will and Laura
            </Button>
          </Link>
          <Link to="/directions">
            <Button variant="outline" color="primary" className="w-100 mb-2">
              Directions to Mango's house
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
