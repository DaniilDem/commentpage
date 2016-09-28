/**
 * Created by Daniil on 26.09.2016.
 */
var CommentFormView = Backbone.View.extend({

    el: "#commentForm",

    events: {
        "submit form":          "formSubmit",
        "change input, textarea":   "changeInput"
    },

    initialize: function() {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "sync", this.sync);
    },

    formSubmit:function (e)
    {
        e.preventDefault();
        console.log('submit');
        this.model.save({}, {//TODO: make validate in model
            success: function (model, respose, options) {
                console.log("The model has been saved to the server");
                console.log(respose);
            },
            error: function (model, xhr, options) {
                console.log("Something went wrong while saving the model");
                console.log(xhr);
            }
        });
    },

    changeInput:function (e)
    {
        let elem =  $(e.target);
        let nameVal = elem.attr('id');
        let tempObj = {};
        tempObj[nameVal] = elem.val();
        this.model.set(tempObj);

        console.log(this.model.toJSON());

    },

    sync:function ()
    {
      console.log("sync comment model");
    },

    render: function() {
        console.log('render');
    }

});