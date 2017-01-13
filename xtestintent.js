// drives process via handles for socket and global network routines
  // note RECEIVE_POST added to intercept text broadcasts from a user
  // the process looks at the text and recommends a response via the command console


  ////////////////////////////////
  ///    location analysis //////
  ///////////////////////////////

  function isCity(entity) {
     return entity.type === 'City';
  }

  function onlyName(entity) {
    return { name: entity.text };
  }

  ///////////////////////////


  const receivePost = (session, data, socket) => {
          session.posts.push(data);
          persist(session);
          sendToAll(socket, session.id, RECEIVE_POST, data);
      };

  const actions = [
      { type: ADD_POST_SUCCESS, handler: receivePost },
      { type: JOIN_SESSION, handler: joinSession },
      { type: RENAME_SESSION, handler: renameSession },
      { type: DELETE_POST, handler: deletePost },
      { type: LIKE_SUCCESS, handler: like },
      { type: EDIT_POST, handler: edit },
      { type: LOGIN_SUCCESS, handler: login },
      { type: LEAVE_SESSION, handler: leave },
      { type: RECEIVE_POST, handler: chatAnalysis }];

      actions.forEach(action => {
        socket.on(action.type, data => {

          const sid = action.type === LEAVE_SESSION ?
          socket.sessionId : data.sessionId;

          if (sid) {
            store.get(sid).then(session => {
            action.handler(session, data.payload, socket);
            });
          }
        });
      });
