'use strict';
var ivoox = require('node-ivoox');
var _ = require('underscore');
var Backbone = require('backbone');
var jQuery = require('jquery');
var ivooxNode = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {}
};

window.ivooxNode = ivooxNode;

/**
 * 
 */
'use strict';
// var Backbone = require('backbone');

ivooxNode.Models.Audio = Backbone.Model.extend({});

/**
 * 
 */
'use strict';
// var Backbone = require('backbone');
// var Audio = require('../models/audio');

ivooxNode.Collections.Audios = Backbone.Collection.extend({
  model: ivooxNode.Models.Audio
});

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

/**
 * 
 */

ivooxNode.Views.Player = Backbone.View.extend({
  el: jQuery('.player'),

  events: {
    'click .play': 'playSong'
  },

  _isPlaying: false,

  template: _.template('<picture><img src="<%= podcast_cover %>" /></picture><div class="info"><span class="title"><%= name %></span><span><%= author %></span></div><audio src="<%= file %>"></audio>'),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var song = this.model.toJSON();
    this.$el.find('.current-track').html(this.template(song));
    this.audio = this.$el.find('audio')[0];
    this.playSong();
  },

  playSong: function() {
    if (this._isPlaying) {
      this.pauseSong();
    }else {
      this.audio.play();
      this._isPlaying = true;
      this.$el.find('.play').removeClass('icon-play').addClass('icon-pause');
    }
  },

  pauseSong: function() {
    this.audio.pause();
    this._isPlaying = false;
    this.$el.find('.play').removeClass('icon-pause').addClass('icon-play');
  }
});

/**
 * Manejo de rutas
 */
'use strict';
// var Backbone = require('backbone');
// // var jQuery = require('jquery');
// var ivoox = require('node-ivoox');
// var Audio = require('../models/audio');
// var Audios = require('../collections/audios');
// var AudiosView = require('../views/list');

ivooxNode.Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function() {
    this.audios = new ivooxNode.Collections.Audios();
    this.playlist = new ivooxNode.Views.List({collection: this.audios});
    this.player = new ivooxNode.Views.Player({model: new ivooxNode.Models.Audio()});
    Backbone.history.start();
  },

  index: function() {
    this.fetchAudios();
  },

  fetchAudios: function() {
    var self = this;
    ivoox.audios().then(function (data) {
      jQuery.each(data, function(key, item) {
        self.addAudio(item);
      });
    }).catch(function(e) {
      console.error(e);
    });
  },

  addAudio: function(audio) {
    this.audios.add(new ivooxNode.Models.Audio({
      name: audio.title,
      author: audio.author,
      podcast_cover: audio.imgMain,
      file: audio.file
    }));
  },
});

'use strict';
// var Backbone = require('backbone');
// var Router = require('./routers/router');
// var jQuery = require('jquery');

jQuery(function() {
  ivooxNode.app = new ivooxNode.Router();
});
