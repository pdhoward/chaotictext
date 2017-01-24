
require('dotenv').config();
////////////////////////////////////////////////////
////////  			chaoticbots text analysis    ///////
///////            version 0.5.0            ///////
//////////////////////////////////////////////////

import express        from 'express';
import path           from 'path';
import bodyParser     from 'body-parser'
import cookieParser   from 'cookie-parser';
import Cookies        from 'cookies';
import cors           from 'cors';
import favicon        from 'serve-favicon';
import http           from 'http';
import moment         from 'moment';
import transport      from './config/gmail';
import setup          from './config/setup';
import secrets        from './config/secrets';
import session        from 'express-session';
import socketIo       from 'socket.io';

import { g, b, gr, r, y } from './color/chalk';

/////////////////////////////////////////////////////////////////////////////////////////////
////////Create our server object with configurations -- either in the cloud or local/////////
////////////////////////////////////////////////////////////////////////////////////////////

const app =         express();

const host =        setup.SERVER.HOST;
const port =        setup.SERVER.PORT;
const dbURI =       process.env.MONGO_URI;

///////////////////////////////////////////////////////////////////////
///////////////////////// Middleware Config ////////////////////////////
//////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(sessionSecret));
app.use(favicon(path.join(__dirname, '..', '/src/img/favicon.ico')));

app.options('*', cors());
app.use(cors());

const httpServer =      new http.Server(app);
const htmlFile =        path.resolve(__dirname, '../client/index.html');
const buildFolder =     path.resolve(__dirname, '../build');

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Configure our Mongo server and set defaults////////////////////////////
///////////////// This also enables a the set of recognized channels for Watson/////////////
////////////////////////////////////////////////////////////////////////////////////////////

require('./db/mongoose')(dbURI);

///////////////////////////////////////////////////////////////////////
///////////////////   session and store setup       ///////////////////
//////////////////////////////////////////////////////////////////////

const sessionSecret = secrets.SECRETS.SESSIONSECRET;
const MongoDBStore = require('connect-mongo')(session);

const track = new MongoDBStore(
        { url: dbURI,
          collection: 'sessions'});

const sessionParms = {
  name: 'chaoticbots',
  secret: sessionSecret,
  saveUninitialized: true,
  resave: false,
  store: track,
  cookie: {
      path: '/',
      secure: false,
      httpOnly: false,
      maxAge: 1000*60*24}
  }


// Catch errors
track.on('error', function(error) {
    console.log("error with session store = " + error);
});

app.use(session(sessionParms));

///////////////////////////////////////////////////////////////////////
/////////////////// chaoticbot alerts on errors //////////////////////
//////////////////////////////////////////////////////////////////////

const mailObject = {
  from: '"ChaoticBots 👥" <chaoticbotshelp@gmail.com>',
  to: 'patrick.howard@hotmail.com',
  subject: 'Platform Error',
  text: ''
}

process.on('uncaughtException', function (er) {
    console.error(er.stack)
    mailObject.text = er.stack;
    transport.sendMail(mailObject, function (er) {
       if (er) console.error(er)
       process.exit(1)
    })
  })

//////////////////////////////////////////////////////////////////////////
//////////////////// Register and Config Routes /////////////////////////
////////////////////////////////////////////////////////////////////////
const stateRouter =       express.Router();
const messageRouter =     express.Router();
const wordRouter =        express.Router();
const alchemyRouter =     express.Router();
const patternRouter =     express.Router();
const classifyRouter =    express.Router();
const scoreRouter =       express.Router();
const actionRouter =      express.Router();
const analyticRouter =    express.Router();
const responseRouter =    express.Router();

require('./routes/state_route')(stateRouter);
require('./routes/message_route')(messageRouter);
require('./routes/word_route')(wordRouter);
require('./routes/alchemy_route')(alchemyRouter);
require('./routes/pattern_route')(patternRouter);
require('./routes/classify_route')(classifyRouter);
require('./routes/score_route')(scoreRouter);
require('./routes/action_route')(actionRouter);
require('./routes/analytic_route')(analyticRouter);
require('./routes/response_route')(responseRouter);

//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  console.log("---------INCOMING----------")
  console.log({requrl: req.url})
  console.log({reqbody: req.body.Body})
  next()
})

///////////////////////////////////////////////////////////////////
app.use('/api', stateRouter);
app.use('/api', messageRouter);
app.use('/api', wordRouter)
app.use('/api', alchemyRouter)
app.use('/api', patternRouter)
app.use('/api', classifyRouter)
app.use('/api', scoreRouter)
app.use('/api', actionRouter)
app.use('/api', responseRouter)
app.use('/api', analyticRouter);

app.use('/build', express.static(buildFolder));

app.get('/', function(req, res) {
		res.sendFile(htmlFile)
	});


///////////////////////////////////////////////////////////////////////
/////////////////Launch Server---  Connect Sockets ////////////////////
//////////////////////////////////////////////////////////////////////
httpServer.listen(port);

const io = socketIo(httpServer);

io.on('connection', function(socket) {
  console.log("someone just joined sockets")
})

app.set('socketio', io);

console.log("running on port " + port);
