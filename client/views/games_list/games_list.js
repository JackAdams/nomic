Template.games_list.helpers({

  openGames : function() {
    return Games.find({status:"open"});
  },
  
  myGames : function() {
    return (Meteor.userId()) ? Games.find({status:"started",players:Meteor.userId()}) : []; 
  },
  
  myGamesCount : function() {
    return (Meteor.userId()) ? Games.find({status:"started",players:Meteor.userId()}).count() : 0;
  }
  
});

Template.games_list.events({
  
  'submit form#new-game' : function(evt) {
    evt.preventDefault();
    var name = $(evt.currentTarget).find('input').val();
    check(name,String);
    if (name) { 
      Meteor.call("createGame",name,function() {
        
      });
    }
    $(evt.currentTarget).find('input').val('');
  }
  
});