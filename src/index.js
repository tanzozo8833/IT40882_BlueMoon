const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const route = require('./routes');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
require('./utils/handlebars-helpers');

const app = express();
const port = 3000;

const exphbs  = require('express-handlebars');

const hbs = exphbs.create({
  helpers: {
    eq: function (a, b) {
      return a === b; // Or use '==' if you want type coercion
    }
  }
});


// Middleware cơ bản
app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối DB
const db = require('./config/db');
db.connect();

// Cấu hình template
app.engine('hbs', engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        eq: (a, b) => a === b
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Session - phải trước routes dùng session
app.use(session({
    secret: 'secret-key-bao-mat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/BlueMoon',
        collectionName: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

// Middleware xác thực
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
