import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';

import routes from './routes/index';
import users from './routes/users';
// //importing our own set of imports fromtoBeExported.ts
// import * as stuff from "./toBeExported";
// //Creating new instance of produxts from toBexported.ts
// let tesla = new stuff.Product("tesla", 100);
// //calling doSomething function
// stuff.doSomething();
// console.log(`orange is ${stuff.orange}`);
// //calling doSomething function with no export
// //stuff.doSomethingSecret();
//
// import TaxService from './ngApp/services/taxService';
//
// let tax = TaxService.calculate(2333.00);
// console.log(tax);
//export by item

// import {Product, doSomething, orange} from "./toBeExported";
// let tesla = new Product("tesla", 100);
// doSomething();
// console.log(`orange is ${orange}`);

// import * as request from 'request';
// request.get("http://codercamps.com", (err, response, body) =>{
//   if (!err && response.statusCode == 200) {
//     console.log(body)
//   }
// })

// import * as gm from 'gm';
// let newImagePath = path.join(__dirname, "hello.jpg");
// gm(200, 400, "#ddff99f3")
// .fill('red')
// .drawCircle(100, 200, 100, 100)
// .write(newImagePath, function(err) {
//   if (err) {
//     console.error(err);
//   }else {
//     console.log("Hello.jpg Image");
//   }
// });


// import * as moment from 'moment';
//
// let age = moment("19120414", "YYYYMMDD").fromNow();
// console.log('The RMS Titanic sank ' + age);

//Sample endpoint

let app = express();
// app.get("/hello", (req, res) => {
//   res.send("Hellooo")
// })

//req.query
// app.get("/shout", (req, res) =>{
//   let message = req.query['message'];
//
//   res.send(`You said "${message}!"`)
//
//   app.get('/product', (req, res) => {
//   let productId = req.query['id'];
//   if (!productId) {
//     res.status(404).send('You did not enter a product id!');
//       //res.Sendstatus(404).send('You did not enter a product id!');
//   } else {
//   //  console.log(`Showing details for product ${productId}`);
//   //  res.send(`Showing details for product ${productId}`);
//   res.end();
//   }
// });

///////////////////////////////////////////////////////////////////////////

import products from "./products";
app.use("/products", products)
// //res object
// app.get("/product", (req, res) =>{
//   let productId = req.query["id"];
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));

app.use('/', routes);
app.use('/users', users);


// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
