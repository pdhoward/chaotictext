

import Promise               from 'bluebird';
import dbText                from '../api/dbText';
import bodyParser            from 'body-parser';
import moment                from 'moment';
import { g, b, gr, r, y }    from '../color/chalk';


const getDBText = Promise.promisify(dbText.get.bind(dbText));



    ////////////////////////////////////////////////////////////
    //////////////////mongo db functions //////////////////////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
      router.use(bodyParser.json());

      router.get('/get_messages/:cnt', function(req, res, next) {

        getDBText({})
          .then(function(result){
            composeObject( result, function(newObj) {
              let data = {}
              data.messages = Array.from(newObj);
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
          res.json([{label: 'positive',
                     color: '#4A90E2',
                     value: 6},
                    {label: 'negative',
                     color: '#734199',
                     value: 12},
                    {label: 'neutral',
                     color: '#C7C7C6',
                     value: 23}]);
          next()
      })

      router.get('/get_num_messages/:cnt', function(req, res, next) {
          console.log(g('DB Route Get Number Messages'));
          res.json({num_messages: 8 });
          next()
      })
  }

  ////////////////////////////////////////////////////////////
  /////// transform mongodb record for use in webapp ////////
  //////////////////////////////////////////////////////////

  function composeObject( oldObj, cb ) {
    let objArray = [];

    var newObject = {
      id: "1234",
      text: "this is a test",
      phone_number: "914-500-5391",
      city: "Charlotte",
      state: "NC",
      day: "thursday",
      time: "3.45 pm",
      channel: ['twilio'],
      partsOfSpeech: ['part1', 'part2', 'part3'],
      wordsDisallowed: ['word1, word2'],
      watsonResponse: ['this is watson response'],
      witResponse: ['this is wit.ai response'],
      botResponse: ['this is the custom bot response'],
      context: ['this is the context'],
      intent: ['this is the intent'],
      keyword: ['keywords', 'keywords2', 'keywords3'],
      concept: ['concepts', 'concepts2', 'concepts3'],
      entity: ['entities', 'entities2', 'entities3'],
      sentiment: "Positive"

    };

    let textObject = {};

    for (var i = 0; i < oldObj.length; i++) {
      newObject.day = moment(oldObj[i].created_at).format("ddd, MMMM D");
      newObject.time = moment(oldObj[i].created_at).format("h:mm:ss a");
      newObject.id = oldObj[i]._id;
      newObject.text = oldObj[i].Body;
      newObject.phone_number = oldObj[i].From;
      newObject.city = oldObj[i].FromCity;
      newObject.state = oldObj[i].FromState;
      newObject.wordsDisallowed = oldObj[i].wordsDisallowed
      textObject = Object.assign({}, newObject);
      objArray.push(textObject);
    }
    cb(objArray)

  }
