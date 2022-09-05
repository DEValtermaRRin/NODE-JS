import express from 'express';

const app = express()

// app.get('/hello/:id', (req, res) =>  {
//   res.send('Hello ' + req.params.id)
// })

app.get('/html', (req, res) =>  {
  res.sendFile('./index.html', {root: '.'})
}) 
/* 
app.get('/hell?o/:id', (req, res) => {
  res.send('hello' + '/hell?o/:id')
})// http://localhost:3000/helllllllo/750 - hello/hell?o/:id

app.get('/hel+o/:id', (req, res) => {
  res.send('hello' + req.params.id)
}) //http://localhost:3000/helo/750 - hello750
app.get('/hello/(:id)?', (req, res) => {
  res.send('hello' + '/hel+o/(:id)?')
}) //http://localhost:3000/hello/sdf - hello/hel+o/(:id)? */


app.use((req, res, next) => {
  console.log(new Date().toISOString());
  next()
  
})

app.get('/person', (req, res) => {
  
})


app.listen(3000, () => console.log('hello from 3000')
)