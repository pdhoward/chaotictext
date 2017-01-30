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
        console.log(g("Step 1 -identify all agents deployed for this intent"))
        console.log(JSON.stringify(intentobj))

        // with opening text only intent is know, not agent. This sets dafaults -- needs refactoring
        if (priority == 'new') {
          response.agent = intentobj[0].agent[0].name;
          response.platform = intentobj[0].agent[0].platform


          console.log(g("NEW -select default agent - NEEDS REFACTORING"))
          console.log(JSON.stringify({response: response}))
          console.log(JSON.stringify({priority: priority}))
          console.log(JSON.stringify({param: param}))
        }

        // from the filtered intent array, grab the agent that matches

        if (intentobj.length > 1){
          console.log(r("Error - duplicate intents in config file: " + response.intent ))
        }

        let agentobj = {}
        let searchobj = intentobj[0].agent.slice()
        agentobj =  searchobj.filter(function (obj){
          return obj.name == response.agent;
          })

        console.log(g("Step 2 -select agent based on name"))
        console.log(JSON.stringify(agentobj))

        // grab config and auth data for platform to be pulsed
        let configobj = {}
        configobj =  configureAgents.filter(function (obj){
          return obj.platform == response.platform;
          })
        console.log(g("Step 3 -fetch config data"))
        console.log(JSON.stringify(configobj))

      // merge two objects to create new workflow entry
        let workFlowObject = {};
        workFlowObject = Object.assign(configobj[0], agentobj[0]);

      // final update specific properties
        workFlowObject.intent = response.intent;
        workFlowObject.id = uuid.v1({msecs: new Date()});
        console.log(g("Step 4 -create workflow object"))
        console.log(JSON.stringify(workFlowObject))
        return cb(null,workFlowObject);

  }
}
