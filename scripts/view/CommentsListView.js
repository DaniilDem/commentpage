/**
 * Created by Daniil on 26.09.2016.
 */
var CommentsListView = Backbone.View.extend({

    el: "#commentsList",

    events: {

    },

    initialize: function() {
        this.listenTo(this.model, "change:commentsArray", this.updateList);
        
    },

    updateList: function() {
        console.log('update list');

        var comments = this.model.get('commentsArray');

        var commentRowTemplate =_.template($('#commentRow').html());
        $('#commentsList').html(commentRowTemplate({'comments':comments.reverse()}));

    }

});