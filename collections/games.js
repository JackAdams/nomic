Games = new Meteor.Collection('games');

Games.allow({
  
  update: function(userId,doc,fields,modifier) {
    if (_.contains(fields,'players')) {
      return Nomic.canJoinGame();
    }
  }
  
});

Meteor.methods({
  'createGame' : function(name) {
    if (Nomic.canAddGame()) {
      var doc = {name:name};
      doc.createdAt = Date.now();
      doc.owner = Meteor.userId();
      doc.status = "open"; // "started" and "finished" are the other statuses
      var game_id = Games.insert(doc);
      // Add rules here
      if (Meteor.isServer) {
        _.each(Nomic.rules, function(rule) {
          rule.game_id = game_id;
          console.log("rule id:",Rules.insert(rule));
        });
      }
    }
  },
  'startGame' : function(game_id) {
    var doc = Games.findOne({_id:game_id},{fields:{owner:1,status:1,players:1}});
    if (!Nomic.canStartGame(doc)) {
      return;
    }
    Games.update({_id:game_id},{$set:{status:'started'}}); 
  }
});