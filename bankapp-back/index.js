const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const applicationsRoutes = require('./routes/applications')
const usersRoutes = require('./routes/users')
const productsRoutes = require('./routes/products')
const passport = require('passport');
require('./middleware/passport')(passport);

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cookieParser());
app.use(passport.initialize());

app.use('', usersRoutes)
app.use('', applicationsRoutes)
app.use('', productsRoutes)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})