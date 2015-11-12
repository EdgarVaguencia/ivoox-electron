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
