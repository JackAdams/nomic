Games = new Meteor.Collection('games');

Games.allow({
  
  insert: function(userId,doc) {
   return Nomic.canAddGame(); 
  }
  
});