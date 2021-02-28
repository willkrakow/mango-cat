import React, {useEffect} from "react"
import { Link } from "gatsby"
import { Button, Container, Row, Col } from 'react-bootstrap'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from '../components/image'
import { Send, House } from '@material-ui/icons'
import Cookies from "universal-cookie"


const IndexPage = () => {


function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

useEffect(() => {
  
  // check for the cookie
  const hasCookie = () => {
    const cookies = new Cookies()
    if(cookies.get("visitedMangoCat") === true){
      return true
    }
    return false
  }
  // set the expiration to one day later and set visitedMangoCat cookie
  const setCookie = () => {
    const cookies = new Cookies()
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    cookies.set("visitedMangoCat", "true", { path: "/", expires: tomorrow })
    console.log(cookies.get('visitedMangoCat'))
  }

  // send request to ipinfo.io and return ip metadata object
  const getIpInfo = async () => {
        const response = await fetch(
          "https://ipinfo.io/json?token=76509fbee1f6a6"
        )
        const json = await response.json()
        return json
  }

  // submit form to netlify with city and region info fetched above
  const formSubmit = async ({city, region}) => {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "page-hit",
        "data-netlify": "true",
        "page-alert": "You had a new visitor",
        "data-netlify-honeypot": "bot-field",
        "city": city,
        "region": region
      })
    })
    const json = await response.json()
    return json
  }

  const callInOrder = async ({ hasCookie }) => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const fromQr = urlParams.get('qr')

    if (fromQr === "true"){
      !hasCookie && setCookie()
      const ipData = await getIpInfo()
      const res = await formSubmit(ipData.city, ipData.region)
      res.ok
      ? console.log("Recorded ip location")
      : console.log("Something went wrong")
    }
  }

  const cookiePresent = hasCookie()
  callInOrder(cookiePresent)
})

return (
  <Layout>
    <SEO title="Home" />
    <Container>
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={6} lg={6}>
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
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=231+W+Margaret+Ln%2C+Hillsborough%2C+NC+27278"
              alt="231 W Margaret Ln | Google Maps"
              className="font-weight-bold text-info"
            >
              231 W Margaret Ln, Hillsborough, NC 27278.
            </a>{" "}
            My parents live there too (I let them–they'd be helpless without me)
            and their names are Will and Laura. They're kinda lame because
            they're my parents but they don't bite.
          </p>
          <h2>What to do with me</h2>
          <div className="ml-2">
            <h3 className="text-info font-weight-bold mb-0">STEP 1</h3>
            <p>Give me snuggles.</p>
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
              <Send className="text-light" /> Send a message to Will and Laura
            </Button>
          </Link>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=231+W+Margaret+Ln%2C+Hillsborough%2C+NC+27278"
            alt="231 W Margaret Ln | Google Maps"
          >
            <Button variant="outline" color="primary" className="w-100 mb-2">
              <House className="text-info" /> Directions to Mango's house
            </Button>
          </a>
        </Col>
      </Row>
    </Container>
  </Layout>
)}
export default IndexPage
