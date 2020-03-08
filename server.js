const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port,()=> console.log("kuuntelen" + port));
app.use(express.static("public"));

app.use(express.json({limit: '1mb'}));

cons pisteet = [{
  "pelaaja" : "Taavi",
  "pisteet" : "1"
},
"pelaaja" : "John Doe",
"pisteet" : "0"
]
app.get('/api/pisteet', function(request,respons))
{
  respons.send(pisteet);
})
