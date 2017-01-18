'use strict';

// Channel is the schema
import Channel                     from '../schemas/Channel';
import mongoose                   from 'mongoose';
import uuid                       from 'node-uuid';
import configureChannels          from './testdata/channels';
import { g, b, gr, r, y }         from '../../color/chalk';

const limit = 1;

function createDefaultChannel () {
      Channel.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of channels for initialization and create entries
            configureChannels.map(function(channel) {
                var newChannel = new Channel(channel)
                newChannel.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Channels Created'))
            return
          }
          else {
            console.log(g('Channels Exist'))
          }
        })
      }

module.exports = {
  createDefaultChannel: createDefaultChannel
}
