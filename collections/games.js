Games = new Meteor.Collection('games');

Games.allow({
  
  insert: function(userId,doc) {
   return Nomic.canAddGame(); 
  },
  
  update: function(userId,doc,fields,modifier) {
    if (_.contains(fields,'players')) {
      return Nomic.canJoinGame();
    }
    if (_.contains(fields,'status')) {
      return Nomic.canStartGame(doc);
    }
  }
  
});

// The following is only possible due to the collection-hooks smart package
Games.before.insert(function(userId,doc) {
  doc.createdAt = Date.now();
  doc.owner = userId;
  doc.status = "open"; // "started" and "finished" are the other statuses
});