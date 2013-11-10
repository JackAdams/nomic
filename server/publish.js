Meteor.publish('games', function() {
  return Games.find({$or:[{status:"open"},{players:this.userId}]});
});

Meteor.publish('game', function(_id) {
  var game = Games.findOne({_id:_id});
  return [
    Games.find({_id:_id}),
    Meteor.users.find({_id:{$in:game.players}},{fields:{"emails.address":1}})
    ];
});