/**
 * Created by Daniil on 26.09.2016.
 */
var CommentFormView = Backbone.View.extend({

    el: "#commentForm",

    events: {
        "submit form":          "formSubmit",
        "click button":   "render",
        "click .button.delete": "destroy"
    },

    initialize: function() {
        this.listenTo(this.model, "change", this.render);
        console.log(this.$el);
    },

    formSubmit:function ()
    {
        console.log('submit');

    },

    render: function() {
        console.log('render');
    }

});