Template.games_list.helpers({

  openGames : function() {
    return Games.find({status:"open"});
  },
  
  myGames : function() {
    return (Meteor.userId()) ? Games.find({status:"started",players:Meteor.userId()}) : []; 
  }
  
});

Template.games_list.events({
  
  'submit form#new-game' : function(evt) {
    evt.preventDefault();
    var name = $(evt.currentTarget).find('input').val();
    check(name,String);
    if (name) {
      Games.insert({name:name}); 
    }
    $(evt.currentTarget).find('input').val('');
  }
  
});