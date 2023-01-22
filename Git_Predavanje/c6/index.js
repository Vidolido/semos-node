// client/server
// podatochni serveri, mail serveri, print serveri, veb serveri, aplikaciski serveri itn.

// HTTP request/response model

// http request
// GET / HTTP/1.1
// Host: google.com
// Accept-Language: en

// http response
// HTTP/1.1 200 OK
// Date: Wed, 28 Dec 2022 20:14:00 GMT
// Server: Apache

// TCP (Transmission Control Protocol)
// TLS (Transport Layer Security)

// Internet Protocol address (IP)

// ipv4 
// 32-bit broj
// vo rang od 0.0.0.0. - 255.255.255.255

// ipv6
// 128-bit broj
// 2001:0db8:0000:0000:0000:8a2e:0370:7334

// port
// 16-bit unassigned broj
// vrednosti od 0 65535 

// 20 FTIP data transfer
// 21 FTP command control
// 22 SSH
// 23 TELNET
// 25 SMTP
// 80 HTTP
// 443 HTTPS

// localhost == 127.0.0.1

const http = require("http");

const server = http.createServer((req, res) => {
    // log vo konzola pri sekoj request
    console.log("*******REQUEST*******");
    console.log("URL: " + req.url);
    console.log("METHOD: " + req.method);
    console.log(req.rawHeaders[3]);
    res.write("Zdravo od serverot!");
    console.log("*********************");
    res.end();
});

server.listen(8080);

// za doma
// 1. OSI Model, TCP/IP Model
// 2. TCP i UDP
// 3. Da se napravi kalkulator za sobiranje, odzemanje, mnozhenje i delenje
//      primeri:
//      request1 url: http://localhost:8080/sobiranje/3/4
//      response1: 7
//      request2 url: http://localhost:8080/odzemanje/4/3
//      response1: 1
// * Za sekoe ostanato UDL da se vrati poraka "NEVALIDNA OPERACIJA"