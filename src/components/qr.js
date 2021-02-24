import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Cookies from "universal-cookie"


export default function Qr() {
const { register, watch, handleSubmit } = useForm()


function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const cookies = new Cookies()
    
    if(cookies.get("visitedMangoCat") === "true") {
        formSubmit();
    } else {
    cookies.set("visitedMangoCat", "true", { path: "/", expires: tomorrow })
        formSubmit();
    }
}, [])


const formSubmit = data => {
  const formData = data
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": "page-hit",
      ...formData,
    }),
  })
    .then(() => console.log("Send notification to Netlify"))
    .catch(error => alert(error))
}
watch()
    return (
        <form
          className="d-none"
          name="page-hit"
          method="post"
          action="/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit(formSubmit)}
        >
            <input type="hidden" name="ip" value="contact" ref={register} />
        </form>
    )
}
