

import Promise               from 'bluebird';
import dbText                from '../api/dbText';
import bodyParser            from 'body-parser';
import moment                from 'moment';
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

      router.get('/get_messages/:cnt', function(req, res, next) {

        getDBText({})
          .then(function(result){
            composeObject( result, function(newObj) {
              console.log(">>>RESULT<<<")
              console.log({newObj: newObj})

              let data = {}
              data.messages = newObj;
              data.totalPages = 1;
              res.json(data);
              next();
            });
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

      router.get('/get_sentiment_count/:cnt', function(req, res, next) {
          console.log(g('DB Route Get Sentiment Count'));
          return
      })

      router.get('/get_num_messages/:cnt', function(req, res, next) {
          console.log(g('DB Route Get Number Messages'));
          return
      })
  }

  function composeObject( oldObj, cb ) {

    let objArray = [];

    for (var i = 0; i < oldObj.length; i++) {

      console.log(">>>INPUT<<<")
      console.log(oldObj[i])

      newObject.day = moment(oldObj[i].created_at).format("ddd, MMMM D");
      newObject.time = moment(oldObj[i].created_at).format("h:mm:ss a");
      newObject.id = oldObj[i]._id;
      newObject.text = oldObj[i].Body;
      newObject.phoneNumber = oldObj[i].From;
      newObject.city = oldObj[i].FromCity;
      newObject.state = oldObj[i].FromState;
      newObject.keywords = {};
      newObject.concepts = {};
      newObject.entities = {};
      newObject.sentiment = "Positive";
      objArray[i] = newObject;
      console.log(">>>OUTPUT<<<")
      console.log(objArray[i])

    }
    cb(objArray)

  }
