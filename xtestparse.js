
.then(function(messageResponse) {
        var responseContext = messageResponse.context;
  //      var idx = messageResponse.intents.map(function(x) {return x.intent; }).indexOf('get_weather');
        var responseType = messageResponse.context.summary;


        switch (responseType) {

              case "Asking for email":

                var userEmail = messageResponse.input.text;
                var validEmail = validator.isEmail(userEmail);
                var mailText1 = '';
                var mailText2 = '';


                if (!validEmail) {

                  var textOutputz = 'hmmmm -- your email does not appear valid. Please try again';
                  messageResponse.context.summary = 'Asking for email';
                  messageResponse = extend(messageResponse, {output: {text: textOutputz}});
                  return messageResponse;
                }
                break;

              case "trying to retrieve location":
                return messageResponse;
                break;

              case "Searching for Idea":
                        ////////////////////////////////////////////////////////////
                        /////// Tokenize and stem the idea submitted by user //////
                        ///////////////////////////////////////////////////////////


   	                      // establish string for NLP pattern matching
   	                      natural.PorterStemmer.attach();

                          // tokenize the new idea that was submitted by user (input text)
                          // the value of messageResponse.context.idea.name is set by Watson Conversation in 'asking for idea'
                          // but if user is already Active in networking then watson conversation (have_email = true) is no longer being called
                          if (messageResponse.context.have_email){
                          messageResponse.context.idea.name = message.input.text;
                            }

 	                      var tokenIdea = messageResponse.context.idea.name.tokenizeAndStem();
                        messageResponse.context.idea.tokens = tokenIdea;

                        return getIdea(messageResponse)

                            .then(function(result) {

                              var matchArray = [];
                              var cntr = 0;
                              var totalIdeasCount = result.length;
                              var userTokenCount = messageResponse.context.idea.tokens.length;
                              var fetchedIdea = '';
                              var userIdea = '';
                              var threshold = 0.80
                              var matchCounter = 0;
                              messageResponse.context.search = result;

                              for (var i = 0; i < totalIdeasCount; i++){

                                // retrieve a matched idea from mongodb query array

                                var fetchedTokenCount = result[i].context.idea.tokens.length;

                                for (var x=0; x < fetchedTokenCount; x++) {
                                    fetchedIdea = result[i].context.idea.tokens[x];
                                    for (var j = 0; j < userTokenCount; j++) {
                                        userIdea = messageResponse.context.idea.tokens[j];
                                        if (natural.JaroWinklerDistance(fetchedIdea, userIdea) > threshold) {
                                          matchCounter++;

                                        }
                                      }
                                    }

                                var matchLevel = matchCounter / userTokenCount;
                                if (matchLevel > .6) {

                                  var matchObject = {};
                                  matchObject.email = result[i].context.email;
                                  matchObject.idea = result[i].context.idea.name;

                                  console.log({matchObject: matchObject});

                                  matchArray.push(matchObject);

                                  console.log({matchArray: matchArray[cntr]});
                                  cntr++;
                                  matchCounter = 0;
                                }
                                else {
                                  matchCounter = 0;
                                }
                              }

                              matchCounter = matchArray.length;

                              for (var t= 0; t < matchCounter; t++) {
                                console.log(matchArray[t]);
                              }

                              // save all matches from search array to context
                              if (matchCounter > 0) {
                                messageResponse.context.match = matchArray;
                                messageResponse.context.matchCounter = matchCounter
                              }
                              else{
                                messageResponse.context.match = [];
                                messageResponse.context.matchCounter = 0
                              }

                              var textOutput1 = '';
                              var textOutput2 = '';
                              var textOutput3 = '';
                              var textOutput4 = '';
                              var textOutputn = '';
                              var newMailText1 = '';
                              var newMailText2 = '';

                              if (matchCounter == 1) {
                                textOutput2 = ' idea from an entrepreneur in your locale that matches yours. '
                              } else {
                                textOutput2 = ' ideas from entrepreneurs in your locale that matches yours. '
                              }

                              if (matchCounter > 0) {
                              textOutput1 = 'I found ';
                              textOutput3 = ' Enter your email address and I will send you contact info for market leaders with ideas similar to yours'
                              textOutput4 = ' No spam! All your information is deleted after 48 hours to keep the network fresh!'
                              messageResponse.context.get_idea = true;
                              messageResponse.context.summary = 'Asking for email';
                            }
                            else {
                              textOutput1 = 'I found no matches with other ';
                              textOutput2 = 'entrepreneurs in your locale. '
                              textOutput3 = 'However, enter your email address and I will notify you if I find matches in the next few days.'
                              textOutput4 = ' No spam! All your information is deleted after 48 hours to keep the network fresh!'
                              messageResponse.context.get_idea = false;
                              messageResponse.context.summary = 'Asking for email';
                            }

                            //  at this point we test to see if we already have the users email and can send the match


                            if (messageResponse.context.matchCounter > 0 && messageResponse.context.have_email) {
                                  var newMailArray = [];
                                  var newMailCounter = messageResponse.context.match.length;

                                  for (var nma= 0; nma < newMailCounter; nma++) {
                                        newMailText1 = JSON.stringify(messageResponse.context.match[nma].email) + ' is working on ' +
                                                       JSON.stringify(messageResponse.context.match[nma].idea) + "\r\n";
                                        newMailArray.push(newMailText1);
                                      }

                                  newMailText2 = newMailArray.join('');

                                  var newUserEmail = messageResponse.context.email;

                                  textOutput3 = ' I just sent you an email with the info';
                                  textOutput4 = ' If you would like to keep networking, enter Yo';
                                  messageResponse.context.summary = 'Active';

                                  var newMailObject = {
                                    from: '"The Entrepreneur Alliance 👥" <chaoticbotshelp@gmail.com>',
                                    to: newUserEmail,
                                    subject: 'Delivering for You',
                                    text: newMailText2
                                  }

                                  sendContacts(newMailObject)
                                    .then(function() {
                                      console.log("Just emailed user from inside Case Searching for Idea");

                                    })
                                  delete messageResponse.context.search;
                              }


                            if (matchCounter == 0 && messageResponse.context.have_email){
                              textOutput3 = '';
                              textOutput4 = ' If you would like to keep searching, enter Yo. ';
                              messageResponse.context.summary = 'Active';
                            }

                            if (matchCounter > 0) {
                              textOutputn = textOutput1 + matchCounter + textOutput2 + textOutput3 + textOutput4;
                            } else {
                              textOutputn = textOutput1 + textOutput2 + textOutput3 + textOutput4;
                            }

                            messageResponse = extend(messageResponse, {output: {text: textOutputn}});
                            return messageResponse;

                          })
                    break;
                    
              default:
                  return messageResponse;
                  break;
            }
        }
