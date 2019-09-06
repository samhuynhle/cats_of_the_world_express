const express = require('express');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUnitialized: true,
    cookie: { MaxAge: 60000 }
}));

app.get('/', (request, response) => {
    if (!(request.session.counter)) {
        request.session.counter = 0;
    } else {
        request.session.counter += 1;
    }
    response.render('index', {counter: request.session.counter});
});

app.get('/process_counter_for_cats', (request, response) => {
    request.session.counter += 1;
    response.redirect('/');
});

app.get('/process_reset', (request, response) => {
    request.session.counter = 0;
    response.redirect('/');
});

app.listen(50, ()=> console.log("I'm listening on port 50"));