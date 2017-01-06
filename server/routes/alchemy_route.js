import bodyParser            from 'body-parser'
import Promise               from 'bluebird';
import alchemy               from '../api/alchemy';
import { g, b, gr, r, y }    from '../color/chalk';

    ////////////////////////////////////////////////////////////
    ////////////////// Deep Text Message Analysis /////////////
    //////////////////////////////////////////////////////////

const extractCity = Promise.promisify(alchemy.extractCity.bind(alchemy));

module.exports = function(router) {

  router.use(bodyParser.json());

  //evaluate a new message
  router.post('/message', function(req, res, next) {

    console.log(g('Alchemy API Route'));

      extractCity(input)
        .then(function(city) {
          if (city) {
          console.log(g('Found City'));
          }
          return

        })
      })
    }
