var http = require('http');
var url = require('url');
var querystring = require('querystring');
 

var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if ('prenom' in params && 'nom' in params) {
        
// w  ww. j a va  2  s.  c  o  m
var myData = [];
var newprenom = params['prenom'];
var newnom = params['nom'];

myData.push(newprenom);
myData.unshift(newnom); // add at the end 
        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
        console.log(myData);
    }
    else {
        res.write('Vous devez bien avoir un prénom et un nom, non ?');
    }
    res.end();
});
server.listen(8080);
 /* var myData = []; 
// w  ww. j a va  2  s.  c  o  m
myData.push(1); // add at the end 
console.log(myData); // prints [1] 

myData.unshift(2); // add to the top 
console.log(myData); // prints [2,1] 

// Arrays are zero index based: 
console.log(myData[0]); // prints 2 */

