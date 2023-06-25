const mongoose = require('mongoose')
const url = `Connection String`;

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('database connected'))

    .catch(err => console.log(err))