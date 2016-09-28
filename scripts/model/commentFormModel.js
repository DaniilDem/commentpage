/**
 * Created by Daniil on 26.09.2016.
 */
var CommentFormModel = Backbone.Model.extend({

    defaults: {
        "nameInput":  "",
        "themeInput":     "",
        "commentInput":    ""
    },

    urlRoot: 'http://localhost:1337/api/commentForm'

});