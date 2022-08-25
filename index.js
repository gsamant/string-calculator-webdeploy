const http = require('http')
const qs = require('querystring')
const calculator = require('./calculator')
 
const server = http.createServer(function(request, response) {
  console.dir(request.param)
 
  if (request.method == 'POST') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data
    })
 
    request.on('end', function() {
      const post = qs.parse(body)
      const numbers = post.numbers
      const result = calculator.add(numbers)
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end(`<input type="text" name="result" value= Result:`+ result+` readonly>`)
    })
  } else {
    var html = `
            <html>
                <body>
                    <form method="post" action="`+url+`">Numbers: 
                        <input type="text" name="numbers" />
                        <input type="submit" name="add" value="Add" />
                    </form>
                </body>
            </html>`
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(html)
  }
})
 
const port = process.env.PORT || 8080;
const url = process.env.URL || "http://localhost:8080";
server.listen(port);
console.log(`Listening at http://localhost:${port}`)