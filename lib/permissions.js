Nomic = {};

Nomic.canAddGame = function() {
 return Meteor.userId(); // will return false if user is not logged in 
}

Nomic.canJoinGame = function() {
 return Meteor.userId(); 
}

Nomic.canStartGame = function(doc) {
  return doc.status === 'open'
      && doc.owner === Meteor.userId()
      && (doc.players && doc.players.length > 1);
}