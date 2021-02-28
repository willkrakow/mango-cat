const fetch = require('node-fetch')

exports.handler = async function (request, context) {
  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }
  const getIpInfo = async () => {
    const response = await fetch(
      `https://ipinfo.io/107.15.16.67?token=76509fbee1f6a6`
    )
    const json = await response.json()
    return json
  }

  const getAddress = async (ipData) => {
    const latlng = await ipData.loc
    const key = process.env.GEOLOCATION_KEY
    const url = `${process.env.GEOLOCATION_URL}latlng=${latlng}&key=${key}`
    const address = await fetch(url)
    const json = await address.json()
    return json.results[0].formatted_address
  }

  // submit form to netlify with city and region info fetched above
  const formSubmit = async (ipData, address) => {
    const cityData = ipData.city
    const regionData = ipData.region
    const addressData = address
    const response = await fetch("https://themangocat.com/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify({
        "form-name": "page-hit",
        "data-netlify": "true",
        "page-alert": "You had a new visitor",
        "data-netlify-honeypot": "bot-field",
        "city": cityData,
        "region": regionData,
        "address": addressData
      })
    })
    const json = await response.text()
    return json
  }

  const callInOrder = async () => {
      const ipData = await getIpInfo()
      const address = await getAddress(ipData)
      const res = await formSubmit(ipData, address)
      res
        ? console.log("Recorded ip location")
        : console.log("Something went wrong")
  }

  callInOrder()
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Map.js ran" }),
  }
}
