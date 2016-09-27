$(function ()
{
    console.log('start');
    var commentModel = new CommentFormModel();
    var commentView = new CommentFormView({model: commentModel});
});

/**
 * Created by Daniil on 26.09.2016.
 */
var CommentFormModel = Backbone.Model.extend({

    defaults: {
        "nameInput":  "",
        "themeInput":     "",
        "commentInput":    ""
    },

    urlRoot: 'http://localhost:51377/api/commentForm'

});
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

    render: function() {
        console.log('render');
    }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2RlbC9Db21tZW50Rm9ybU1vZGVsLmpzIiwidmlldy9Db21tZW50Rm9ybVZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uICgpXG57XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0Jyk7XG4gICAgdmFyIGNvbW1lbnRNb2RlbCA9IG5ldyBDb21tZW50Rm9ybU1vZGVsKCk7XG4gICAgdmFyIGNvbW1lbnRWaWV3ID0gbmV3IENvbW1lbnRGb3JtVmlldyh7bW9kZWw6IGNvbW1lbnRNb2RlbH0pO1xufSk7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBEYW5paWwgb24gMjYuMDkuMjAxNi5cclxuICovXHJcbnZhciBDb21tZW50Rm9ybU1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcclxuXHJcbiAgICBkZWZhdWx0czoge1xyXG4gICAgICAgIFwibmFtZUlucHV0XCI6ICBcIlwiLFxyXG4gICAgICAgIFwidGhlbWVJbnB1dFwiOiAgICAgXCJcIixcclxuICAgICAgICBcImNvbW1lbnRJbnB1dFwiOiAgICBcIlwiXHJcbiAgICB9LFxyXG5cclxuICAgIHVybFJvb3Q6ICdodHRwOi8vbG9jYWxob3N0OjUxMzc3L2FwaS9jb21tZW50Rm9ybSdcclxuXHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERhbmlpbCBvbiAyNi4wOS4yMDE2LlxyXG4gKi9cclxudmFyIENvbW1lbnRGb3JtVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcclxuXHJcbiAgICBlbDogXCIjY29tbWVudEZvcm1cIixcclxuXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgICBcInN1Ym1pdCBmb3JtXCI6ICAgICAgICAgIFwiZm9ybVN1Ym1pdFwiLFxyXG4gICAgICAgIFwiY2hhbmdlIGlucHV0LCB0ZXh0YXJlYVwiOiAgIFwiY2hhbmdlSW5wdXRcIlxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsIFwiY2hhbmdlXCIsIHRoaXMucmVuZGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgZm9ybVN1Ym1pdDpmdW5jdGlvbiAoZSlcclxuICAgIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdCcpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2F2ZSh7fSwgey8vVE9ETzogbWFrZSB2YWxpZGF0ZSBpbiBtb2RlbFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobW9kZWwsIHJlc3Bvc2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIG1vZGVsIGhhcyBiZWVuIHNhdmVkIHRvIHRoZSBzZXJ2ZXJcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb3NlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChtb2RlbCwgeGhyLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHNhdmluZyB0aGUgbW9kZWxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZUlucHV0OmZ1bmN0aW9uIChlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBlbGVtID0gICQoZS50YXJnZXQpO1xyXG4gICAgICAgIGxldCBuYW1lVmFsID0gZWxlbS5hdHRyKCdpZCcpO1xyXG4gICAgICAgIGxldCB0ZW1wT2JqID0ge307XHJcbiAgICAgICAgdGVtcE9ialtuYW1lVmFsXSA9IGVsZW0udmFsKCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5zZXQodGVtcE9iaik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW9kZWwudG9KU09OKCkpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyJyk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
