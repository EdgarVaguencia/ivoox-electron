/**
 * 
 */
'use strict';
// var Backbone = require('backbone');
// var AudioView = require('../views/audio');
// var jQuery = require('jquery');

ivooxNode.Views.List = Backbone.View.extend({
  el: jQuery('.page-content'),

  initialize: function() {
    this.listenTo(this.collection, 'add', this.add, this);
  },

  add: function(audio) {
    var song = new ivooxNode.Views.Audio({model: audio});
    this.$el.append(song.render().el);
  },
});
