'use strict';

import bodyParser            from 'body-parser'
import Promise               from 'bluebird';
import alchemy               from '../api/alchemy';
import { g, b, gr, r, y }    from '../color/chalk';

    ////////////////////////////////////////////////////////////
    ////////////////// Deep Text Message Analysis /////////////
    //////////////////////////////////////////////////////////

const extractCity = Promise.promisify(alchemy.extractCity.bind(alchemy));

const extractRelations = Promise.promisify(alchemy.extractRelations.bind(alchemy));
const extractConcepts = Promise.promisify(alchemy.extractConcepts.bind(alchemy));
const extractKeyWords = Promise.promisify(alchemy.extractKeyWords.bind(alchemy));
const extractEntities = Promise.promisify(alchemy.extractEntities.bind(alchemy));

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

    console.log(g('Alchemy API Route'));

      extractRelations(req.body.Body)
        .then(function(result) {

          console.log(g('RELATIONS-----------------'));
          result.relations.map(function(text){
            console.log({sentence: JSON.stringify(text.sentence)});
            console.log({subject: JSON.stringify(text.subject)});
            console.log({action: JSON.stringify(text.action)});
            console.log({object: JSON.stringify(text.object)});
          })


          extractEntities(req.body.Body)
            .then(function(result) {

              console.log(g('ENTITIES-----------------'));

              result.entities.map(function(text){
                console.log({entity: JSON.stringify(text.text)});
                console.log({type: JSON.stringify(text.type)});
                console.log({relevance: JSON.stringify(text.relevance)});
                console.log({insight: JSON.stringify(text.disambiguated)});
              })

              extractKeyWords(req.body.Body)
                .then(function(result) {
                  console.log(g('KEYWORDS-----------------'));

                  result.keywords.map(function(text){
                    console.log({keyword: JSON.stringify(text.text)});
                    console.log({relevance: JSON.stringify(text.relevance)});
                  })

                next()
                          
            })
          })
        })
      })
    }
