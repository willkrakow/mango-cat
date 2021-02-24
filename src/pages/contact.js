import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Layout from '../components/layout'




export default function Contact() {
    const { register, watch, handleSubmit } = useForm()

    const onSubmit = ({data}) => console.log(data)
    watch()
    return (
      <Layout>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="contactEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={register}
              type="email"
              placeholder="Enter email"
              name="email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="contactPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              ref={register}
              name="phoneNumber"
              type="tel"
              placeholder="Password"
            />
            <Form.Text className="text-muted">
              Just in case we need to give you a ring.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="contactLocation">
            <Form.Label>Your address</Form.Label>
            <Form.Control
              ref={register}
              name="address"
              type="text"
              placeholder="123 Mangocat Lane"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Layout>
    )
}