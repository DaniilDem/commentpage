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

    },

    formSubmit:function (e)
    {
        e.preventDefault();
        console.log('submit');
        var that = this;
        this.clearError();
        this.model.save({}, {//TODO: make validate in model
            success: function (model, respose, options) {
                console.log("The model has been saved to the server");
                console.log(respose);
            },
            error: function (model, xhr, options) {
                console.log("Something went wrong while saving the model");
                console.log(xhr);
                that.renderError(xhr);
            }
        });
    },

    changeInput:function (e)
    {
        var elem =  $(e.target);
        var nameVal = elem.attr('id');
        var tempObj = {};
        tempObj[nameVal] = elem.val();
        this.model.set(tempObj);

        console.log(this.model.toJSON());

    },

    renderError: function(xhr) {
        console.log('render Error');
        var errArr = xhr.responseJSON.error;

        var form = $('#commentForm form');

        _.each(errArr, function (item)
        {
            var formGroup = form.find('#'+item.property).parent('');
            formGroup.addClass('has-error');
            formGroup.find('#'+item.property+'Help').html(item.message);
        })
    },
    
    clearError:function ()
    {
        var form = $('#commentForm form'); 
        form.find('.form-group').removeClass('has-error');
        form.find('.help-block').html('');
    }

});
//# sourceMappingURL=CommentFormView.js.map
