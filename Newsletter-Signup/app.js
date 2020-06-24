const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
// const { Http2ServerRequest } = require("http2")

const app = express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
  const firstname = req.body.Fname
  const lastname = req.body.Lname
  const email = req.body.email

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  }

  const jsonData = JSON.stringify(data)

  const url = 'https://us10.api.mailchimp.com/3.0/lists/1e2bccf589'

  const options = {
    method: "POST",
    auth: "Semi:91094b480b089186b3d158cb3ef6d1ff-us10"
  }

  const request = https.request(url, options, function(response){
  response.on("data", function(data){
    console.log(JSON.parse(data))
  })
})

request.write(jsonData)
request.end()

})



app.listen(3000, function () {
  console.log("Server is running on port 3000");
})
