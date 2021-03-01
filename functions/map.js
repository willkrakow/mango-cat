const fetch = require('node-fetch')
const {URLSearchParams} = require('url')

exports.handler = async function (request, context) {
  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }
  const getIpInfo = async () => {
    console.log(request.headers['x-forwarded-for'])
    const clientIP = request.headers['x-forwarded-for']
    const response = await fetch(
      `https://ipinfo.io/107.15.16.67${clientIP}?token=${process.env.IP_INFO_TOKEN}`
    )
    const json = await response.json()
    return json
  }

  const getAddress = async (ipData) => {
    const url = `${process.env.GEOLOCATION_URL}latlng=${ipData.loc}&key=${process.env.GEOLOCATION_KEY}`
    const locationData = await fetch(url)
    const json = await locationData.json()
    return json.results[0].formatted_address
  }

  // submit form to netlify with city and region info fetched above
  const formSubmit = async (ipData, address) => {
    const params = new URLSearchParams()
    params.append('city', ipData.city)
    params.append('region', ipData.region)
    params.append('address', address)
    params.append('data-netlify', true)
    params.append('data-netlify-honeypot', "bot-field")
    params.append('form-name', 'page-hit')
    params.append('device-type', request.accept['user-agent'])
    const response = await fetch("https://hooks.zapier.com/hooks/catch/6937385/onr6z4p/", {
      method: "POST",
      body: params
    })
    const ok = response.ok
    return ok
  }

  const callInOrder = async () => {
      const ipData = await getIpInfo()
      const address = await getAddress(ipData)
      const res = await formSubmit(ipData, address)
      if (res) {
        console.log('callInOrder ran okay')
        return true
      }
      else {
        return false
      }
  }

  const alright = await callInOrder()
  if (alright) {
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Map.js ran okay"})
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "something went wrong at the end" })
  }
}
