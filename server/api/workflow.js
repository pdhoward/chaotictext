'use strict';

/////////////////////////////////////////////////////////////////////////////////
////////  Analyzes intent or agent directive and sets workflow           ////////
///////   for example, on initial text all is determined is the intent   ////////
//////     Subsequently a bot may direct another bot to take action      ////////
/////////////////////////////////////////////////////////////////////////////////

import configureAgents       from '../config/chaotic';
import uuid                  from 'node-uuid';
import { g, b, gr, r, y }    from '../color/chalk';

module.exports = {

  set: function(param, cb) {

        // retrieve agent configuration based on intent, agent name and platform
        // needs to be updated to handle no agent being returned due to config file error
        // param object process property indicates if this is first or subsequent turn

        console.log(g("BUILD WORK FLOW OBJECT"))
        console.log(JSON.stringify(param))

        let response = param.response;
        let priority = param.priority

        // grab intent objects -- identifying agents based on topic
        let intentobj = {}
        intentobj =  configureAgents.filter(function (obj){
          return obj.intent == response.intent;
          })

        // with opening text only intent is know, not agent. This sets dafaults -- needs refactoring
        if (priority = 'new') {
          response.agent = intentobj[0].agent[0].name;
          response.platform = intentobj[0].agent[0].platform
        }

        // from the filtered intent array, grab the agent that matches
        let agentobj = {}
        agentobj =  intentobj.filter(function (obj){
          return obj.name == response.agent;
          })

        // grab config and auth data for platform to be pulsed
        let configobj = {}
        configobj =  configureAgents.filter(function (obj){
          return obj.platform == response.platform;
          })

      // merge two objects to create new workflow entry
        let workFlowObject = {};
        workFlowObject = Object.assign(configobj[0], agentobj[0]);

      // final update specific properties
        workFlowObject.name = response.agent;
        workFlowObject.greeting = response.greeting;
        workFlowObject.id = uuid.v1({msecs: new Date()});
        return cb(null,workFlowObject);

  }
}
