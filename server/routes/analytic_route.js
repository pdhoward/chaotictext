import bodyParser            from 'body-parser'
import { g, b, gr, r, y }    from '../color/chalk';


    ////////////////////////////////////////////////////////////
    //////////////////Word Check API///////////////////////////
    //////////////////////////////////////////////////////////

module.exports = function(router) {
    router.use(bodyParser.json());
      //evaluate a new message
      router.post('/api', function(req, res, next) {

        console.log(g('Analytic Route'));
        return

  })
}
