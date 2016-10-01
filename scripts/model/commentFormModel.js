/**
 * Created by Daniil on 26.09.2016.
 */
var CommentFormModel = Backbone.Model.extend({

    defaults: {
        "nameInput":  "",
        "themeInput":     "",
        "commentInput":    ""
    },


    initialize: function() {
        this.on("sync", this.modelSync);
    },

    modelSync:function ()
    {
        console.log('comment model sync');
        app.commentsListModel.addOneComment(this.toJSON());
    },

    urlRoot: app.serverUrl+'/commentForm'

});
//# sourceMappingURL=CommentFormModel.js.map
