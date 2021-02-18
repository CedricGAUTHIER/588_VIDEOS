require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const moment = require('moment');
//const session = require('express-session');

//const userRouter = require('./app/router/userRouter');
//const sortRouter = require('./app/router/sortRouter');
//const sessionRouter = require('./app/router/sessionRouter');
//const reviewRouter = require('./app/router/reviewRouter');
//const adminRouter = require('./app/router/adminRouter');
// On active le middleware pour parser le JSON

app.set('view engine','ejs');
app.set('views','app/views');
//app.use(express.static(__dirname + '/public'));

app.use(express.static('public'));
moment.locale('fr');



//app.use(session({
//    secret: process.env.SESSION_SECRET,
//    resave: false,
//    saveUninitialized: true,
//    cookie: {
//        httpOnly: true ,
//    }
//}));

app.use((error, request, response, next) => {
    
    if (error) {
        
        console.error('Erreur à la connexion',error);
    } 

    response.status(500).send('{"Ok connexion": true}');

});
// On lève la restriction CORS pour nos amis React
 app.all('*', (request, response, next) => {
      console.log('Autorisation du protocole CORs');
     response.header('Access-Control-Allow-Origin', request.header('Origin') || '*');
     response.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
     response.header('Access-Control-Allow-Headers', request.header('Access-Control-Request-Headers') || '*');
     response.header('Access-Control-Allow-Credentials', 'true');
     response.header('Access-Control-Max-Age', '864000');
     
     next();
 });


// On préfixe le router
// car toutes les routes dedans commencent par /posts
// app.use('/posts', postsRouter);
// app.use('/categories', categoriesRouter);
//si pas de préfixe : app.use(postsRouter);

// si route post : on rajoute la gestion des POST body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const visitorRouter = require('./server/router/visitorRouter');

app.use(visitorRouter);
//app.use(userRouter);
//app.use(sortRouter);
//app.use(sessionRouter);
//app.use(reviewRouter);
//app.use(adminRouter);


app.use(express.json());
//app.use((request, response, next) => {
//    response.status(404).render('404');
    
    
    //console.log('COOKIES', request.header('Cookie'));
//    next();

//});
app.listen(port, _ => {
    console.log(`Listening on ${port}`);
});