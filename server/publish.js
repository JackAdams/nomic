Meteor.publish('games', function() {
  return Games.find({$or:[{status:"open"},{players:this.userId}]});
});

Meteor.publish('game', function(_id) {
  return Games.find({_id:_id});
});