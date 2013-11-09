// This is the iron-router smart package in action

Router.configure({
  layoutTemplate: 'layout',
  autoRender: false
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('home', {
    path: '/',
    // template: 'home',

    load: function () {
      // called on first load
    },

    // before hooks are run before your action
    before: [
      function () {
        this.subscribe('games').wait();
      },

      function () {
        // we're done waiting on all subs
        if (this.ready()) {
          NProgress.done(); 
        } else {
          NProgress.start();
          this.stop(); // stop downstream funcs from running
        }
      }
    ]
  });
  
  this.route('play', {
    path: '/play/:_id',
    before: [
      function() {
        this.subscribe('game', this.params._id).wait();
      }
    ],
    data: function() {
      return Games.findOne({_id:this.params._id});
    }
  });
  
});