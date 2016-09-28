/**
 * Created by Daniil on 26.09.2016.
 */
var CommentsListModel = Backbone.Model.extend({

    defaults: {
        "commentsArray":  []
        },

    initialize: function() {
        this.updateList();
    },

    updateList:function ()
    { var that = this;
        this.fetch({
            success: function (model, respose, options) {
                console.log(respose);
            },
            error: function (model, xhr, options) {
                console.log(xhr);
            }
        });
    },

    urlRoot: 'http://localhost:1337/api/commentsList'

});