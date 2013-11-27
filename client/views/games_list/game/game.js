Template.game.helpers({
  
  playersCount: function() {
    return (this.players && this.players.length) || 0; 
  },
  
  instruction: function() {
    if (this.status === 'open') {
      if (Meteor.userId()) {
        if (!this.players || (this.players && !_.contains(this.players,Meteor.userId()))) {
          return 'click to join game';
        }
        return 'you have joined this game';
      }
      return 'sign in to join game';
    }
    return 'click to play';
  },
  
  canStartGame: function() {
    return Nomic.canStartGame(this); 
  }
  
});

Template.game.events({
  
  'click .game' : function() {
    if (this.status === 'open') {
      if (!Nomic.canJoinGame) {
        alert("Sign in to join game");
        return; 
      }
      var modifier = (this.players && _.contains(this.players,Meteor.userId())) ? "$pull" : "$addToSet";
      var fields = {};
      fields[modifier] = {players:Meteor.userId()};
      Games.update({_id:this._id},fields);
    }
    else if (Meteor.userId() && this.players && _.contains(this.players,Meteor.userId())) {
      Router.go('play',{_id:this._id});
    }
  },
  
  'click button' : function() {
    Meteor.call('startGame',this._id, function(err,res) {
      if (err) {
        console.log(err); 
      }
    });
  }
  
});