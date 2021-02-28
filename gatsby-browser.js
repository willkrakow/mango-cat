import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.min.js"
import "@popperjs/core/dist/umd/popper.min.js"

export const onPostPrefetchPathname = () => {
  const r = window.confirm("Share location data?")
  if (r) {
    function success(position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      console.log(latitude, longitude)
    }
    function failure() {
      console.log("nope")
    }

    if (navigator.geolocation) {
        const id = navigator.geolocation.watchPosition(success, failure)
        console.log(id)
    }
  }
  else {
      console.log("No geolocation available")
  }

  console.log("We've started the client entry browser function")
  fetch("/.netlify/functions/entry.js")
}
