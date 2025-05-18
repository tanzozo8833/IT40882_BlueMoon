const express = require('express')
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express()
const port = 3000

app.use(morgan('combined'));
app.use(methodOverride('_method'));

// Cấu hình engine template
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route
const route = require('./routes');
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})