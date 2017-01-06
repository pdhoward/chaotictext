

import Promise               from 'bluebird';
import dbText                from '../api/dbText';
import bodyParser            from 'body-parser'
import { g, b, gr, r, y }    from '../color/chalk';


const getDBText = Promise.promisify(dbText.get.bind(dbText));

// stub
const input = {
  text: 'message stub in word api'
  }

var newObject = {
  id: "1234",
  text: "this is a test",
  phoneNumber: "914-500-5391",
  city: "Charlotte",
  state: "NC",
  day: "thursday",
  time: "3.45 pm",
  keywords: {},
  concepts: {},
  entities: {},
  sentiment: "Positive"
};

var sendObject = {
  messages: [],
  totalPages: 1
}

sendObject.messages[0] = newObject;

    ////////////////////////////////////////////////////////////
    //////////////////mongo db functions //////////////////////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
    router.use(bodyParser.json());

      router.get('/get_messages', function(req, res, next) {
        console.log(g('DB Route Get Messages'));
        getDBText()
          .then(function(result){

            return sendObject
          })
        })

      router.post('/archive_message', function(req, res, next) {
          console.log(g('DB Route Post Archive'));
          return
      })

      router.get('/get_archive_messages', function(req, res, next) {
          console.log(g('DB Route Get Archive'));
          return
      })

      router.get('/get_sentiment_count', function(req, res, next) {
          console.log(g('DB Route Get Sentiment Count'));
          return
      })

      router.get('/get_num_messages', function(req, res, next) {
          console.log(g('DB Route Get Number Messages'));
          return
      })
  }
