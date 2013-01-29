Handlebars.registerHelper("autoConnect", function() {
  connect();
  Meteor.setTimeout(function () {
    startPublishing();
  }, 1 * 1000);
});

Template.classroom.activeRoom = function () {
  return (Session.get('roomClicked') === this._id);
};

Template.chatinput.events({
  'click input.btn' : function () {
    var username = Meteor.user().username;
    var chatmessage = document.getElementById("chatbox").value;
    var timestamp = moment(new Date()).fromNow();
    Classrooms.update({_id: this._id}, {$push: {chatlogs: {author: username, message: chatmessage, createdat: timestamp}}});
  }
});

Template.classroom.events({
  'click input.leaveroom' : function () {
    Session.set('roomClicked', undefined);
    Meteor.Router.to('/classrooms')
  }
});

Template.teacherDashboard.numSubscribers = function () {
  return _.size(subscribers);
};