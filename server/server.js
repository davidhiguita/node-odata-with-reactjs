const odata = require('node-odata');
const cors = require('cors');
const server = odata('mongodb://localhost/odata1');
const PORT = process.env.PORT = 1945;

server.use(cors())

server.resource('books', {
  author: String,
  description: String,
  genre: String,
  price: Number,
  publish_date: Date,
  title: String,
  id: String
});

server.listen(PORT);