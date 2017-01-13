import mongoose                   from 'mongoose';
import initializeModel            from './initialize/initialize';
import initializeArray            from './initialize/getintents';
import { g, b, gr, r, y }         from '../color/chalk';

module.exports = function (dbURI) {
    mongoose.connect(dbURI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, r('connection error...')));
    db.once('open', function callback() {
        initializeModel.createDefaultChannel();
        initializeArray.getIntents();
        console.log(g('MongoDB Connected'));
    });
};
