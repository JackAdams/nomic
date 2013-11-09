Template.games_list.helpers({

  games : function() {
    return Games.find();
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
  }
  
});