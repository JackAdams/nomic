Template.play.helpers({

  emailAddress : function() {
    var user = Meteor.users.findOne({_id:this.toString()});
    return user && user.emails[0].address;
  },
  
  rules : function() {
    return Rules.find({game_id:this._id}); 
  }

});