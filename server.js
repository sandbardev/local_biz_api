require('@babel/register')
require('dotenv').config()

const app = require('./src/app').default

app.listen(process.env.PORT, () => console.log(`App running in port ${process.env.PORT}`))