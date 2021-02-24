import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../components/layout'
import { useForm } from 'react-hook-form'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Send } from '@material-ui/icons'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Contact() {

    const { register, watch, handleSubmit } = useForm()
    

  const formSubmit = (data) => {
    const formData = data
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...formData,
      }),
    })
      .then(() => navigate('/thanks'))
      .catch((error) => alert(error))
  }

  watch()

  return (
    <Layout>
      <h1 className="text-center text-dark">Contact my parents</h1>
      <h3 className="text-center text-muted">They like to know where I am</h3>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form
              name="contact"
              method="post"
              action="/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit(formSubmit)}
            >
              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input
                type="hidden"
                name="form-name"
                value="contact"
                ref={register}
              />
              <Form.Group className="mb-4">
                <Form.Label className="mb-0">Your name</Form.Label>
                <Form.Control
                  type="text"
                  ref={register}
                  name="contactName"
                  placeholder="Jane Doe"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="mb-0">Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref={register}
                  name="contactEmail"
                  placeholder="jane@doe.com"
                />
                <Form.Text>In case we need to get in touch with you.</Form.Text>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="mb-0">Phone number</Form.Label>
                <Form.Control
                  type="tel"
                  ref={register}
                  name="contactPhone"
                  placeholder="(919) 867-5309"
                />
                <Form.Text>Samesies</Form.Text>
              </Form.Group>
              <Button className="w-100" type="submit"><Send /> Send</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}