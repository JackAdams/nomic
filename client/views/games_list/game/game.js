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
      Games.update({_id:this._id},{$addToSet:{players:Meteor.userId()}});
    }
    else if (Meteor.userId() && this.players && _.contains(this.players,Meteor.userId())) {
      Router.go('play',{_id:this._id});
    }
  },
  
  'click button' : function() {
    Games.update({_id:this._id},{$set:{status:'started'}}); 
  }
  
});