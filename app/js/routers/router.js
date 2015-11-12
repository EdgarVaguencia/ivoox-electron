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
