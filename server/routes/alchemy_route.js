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
          console.log({relations: JSON.stringify(result)});

          extractEntities(req.body.Body)
            .then(function(result) {
              console.log(g('ENTITIES-----------------'));
              console.log({entities: JSON.stringify(result)});

              extractKeyWords(req.body.Body)
                .then(function(result) {
                  console.log(g('KEYWORDS-----------------'));
                  console.log({keywords: JSON.stringify(result)});

                next()              
            })
          })
        })
      })
    }
