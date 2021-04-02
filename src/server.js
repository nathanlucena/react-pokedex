const express = require('express') //importacao do pacote
const app = express() //instanciando express
const cors = require('cors')


const pokeTypes  = 'pokeapi.co/api/v2/pokemon/';

app.use(cors()) //habilitando cors na nossa aplicacao


app.get('/s', function (req, res) { //endereco da requisicao onde e retornado hello world
  res.send(pokeTypes)
})
app.listen(3002) //execucao do servidor