/**
 * 
 */
'use strict';
// var Backbone = require('backbone');
// var _ = require('underscore');

ivooxNode.Views.Audio = Backbone.View.extend({

  className: 'audio-view',

  template: _.template('<div class="audio-cover"><div class="cover-play"></div><img src="<%= podcast_cover %>" alt="<%= name %>" /></div><div class="audio-info"><span class="title"><%= name %></span></div>'),

  events: {
    'click .cover-play': 'play'
  },

  render: function() {
    var audio = this.model.toJSON();
    var html = this.template(audio);
    this.$el.html(html);
    return this;
  },

  play: function() {
    ivooxNode.app.player.model.set(this.model.toJSON());
    return false;
  },
});
