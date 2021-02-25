import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.min.js"
import "@popperjs/core/dist/umd/popper.min.js"


export const onClientEntry = () => {
  console.log("We've started the client entry browser function")
  fetch('/.netlify/functions/entry.js')
}