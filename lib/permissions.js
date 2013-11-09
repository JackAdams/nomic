Nomic = {};

Nomic.canAddGame = function() {
 return Meteor.userId(); // will return false if user is not logged in 
}