import mongoose                   from 'mongoose';
import initializeChannels         from './initialize/getchannels';
import initializeIntents          from './initialize/getintents';
import initializeClassifier       from './initialize/getclassifications';
import { g, b, gr, r, y }         from '../color/chalk';

module.exports = function (dbURI) {
    mongoose.connect(dbURI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, r('connection error...')));
    db.once('open', function callback() {
        initializeChannels.createDefaultChannel();
        initializeIntents.getIntents();
        initializeClassifier.getClassifications();
        console.log(g('MongoDB Connected'));
    });
};
