var app =
{
    commentModel:{},
    commentsListModel: {},
    serverUrl:'http://localhost:1337/api'
};

$(function ()
{
    console.log('start');
    app.commentModel = new CommentFormModel();
    var commentView = new CommentFormView({model: app.commentModel});

    app.commentsListModel = new CommentsListModel();
    var commentsListView = new CommentsListView({model: app.commentsListModel});
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
        $('#commentsList').html(commentRowTemplate({'comments':comments}));

    }

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
    {
        var that = this;
        this.fetch({
            success: function (model, respose, options) {
                console.log(respose);
            },
            error: function (model, xhr, options) {
                console.log(xhr);
            }
        });
    },

    addOneComment: function (comment)
    {
        var commentsArr = this.get('commentsArray');
        commentsArr.unshift(comment);
        this.trigger('change:commentsArray');
    },

    urlRoot: app.serverUrl+'/commentsList'

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJ2aWV3L0NvbW1lbnRGb3JtVmlldy5qcyIsInZpZXcvQ29tbWVudHNMaXN0Vmlldy5qcyIsIm1vZGVsL0NvbW1lbnRGb3JtTW9kZWwuanMiLCJtb2RlbC9Db21tZW50c0xpc3RNb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9XG57XG4gICAgY29tbWVudE1vZGVsOnt9LFxuICAgIGNvbW1lbnRzTGlzdE1vZGVsOiB7fSxcbiAgICBzZXJ2ZXJVcmw6J2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGknXG59O1xuXG4kKGZ1bmN0aW9uICgpXG57XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0Jyk7XG4gICAgYXBwLmNvbW1lbnRNb2RlbCA9IG5ldyBDb21tZW50Rm9ybU1vZGVsKCk7XG4gICAgdmFyIGNvbW1lbnRWaWV3ID0gbmV3IENvbW1lbnRGb3JtVmlldyh7bW9kZWw6IGFwcC5jb21tZW50TW9kZWx9KTtcblxuICAgIGFwcC5jb21tZW50c0xpc3RNb2RlbCA9IG5ldyBDb21tZW50c0xpc3RNb2RlbCgpO1xuICAgIHZhciBjb21tZW50c0xpc3RWaWV3ID0gbmV3IENvbW1lbnRzTGlzdFZpZXcoe21vZGVsOiBhcHAuY29tbWVudHNMaXN0TW9kZWx9KTtcbn0pO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudEZvcm1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xyXG5cclxuICAgIGVsOiBcIiNjb21tZW50Rm9ybVwiLFxyXG5cclxuICAgIGV2ZW50czoge1xyXG4gICAgICAgIFwic3VibWl0IGZvcm1cIjogICAgICAgICAgXCJmb3JtU3VibWl0XCIsXHJcbiAgICAgICAgXCJjaGFuZ2UgaW5wdXQsIHRleHRhcmVhXCI6ICAgXCJjaGFuZ2VJbnB1dFwiXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZm9ybVN1Ym1pdDpmdW5jdGlvbiAoZSlcclxuICAgIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdCcpO1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGlzLmNsZWFyRXJyb3IoKTtcclxuICAgICAgICB0aGlzLm1vZGVsLnNhdmUoe30sIHsvL1RPRE86IG1ha2UgdmFsaWRhdGUgaW4gbW9kZWxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1vZGVsLCByZXNwb3NlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc2VydmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAobW9kZWwsIHhociwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBzYXZpbmcgdGhlIG1vZGVsXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeGhyKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucmVuZGVyRXJyb3IoeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VJbnB1dDpmdW5jdGlvbiAoZSlcclxuICAgIHtcclxuICAgICAgICB2YXIgZWxlbSA9ICAkKGUudGFyZ2V0KTtcclxuICAgICAgICB2YXIgbmFtZVZhbCA9IGVsZW0uYXR0cignaWQnKTtcclxuICAgICAgICB2YXIgdGVtcE9iaiA9IHt9O1xyXG4gICAgICAgIHRlbXBPYmpbbmFtZVZhbF0gPSBlbGVtLnZhbCgpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2V0KHRlbXBPYmopO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vZGVsLnRvSlNPTigpKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlckVycm9yOiBmdW5jdGlvbih4aHIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyIEVycm9yJyk7XHJcbiAgICAgICAgdmFyIGVyckFyciA9IHhoci5yZXNwb25zZUpTT04uZXJyb3I7XHJcblxyXG4gICAgICAgIHZhciBmb3JtID0gJCgnI2NvbW1lbnRGb3JtIGZvcm0nKTtcclxuXHJcbiAgICAgICAgXy5lYWNoKGVyckFyciwgZnVuY3Rpb24gKGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZm9ybUdyb3VwID0gZm9ybS5maW5kKCcjJytpdGVtLnByb3BlcnR5KS5wYXJlbnQoJycpO1xyXG4gICAgICAgICAgICBmb3JtR3JvdXAuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgICAgICBmb3JtR3JvdXAuZmluZCgnIycraXRlbS5wcm9wZXJ0eSsnSGVscCcpLmh0bWwoaXRlbS5tZXNzYWdlKTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY2xlYXJFcnJvcjpmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBmb3JtID0gJCgnI2NvbW1lbnRGb3JtIGZvcm0nKTsgXHJcbiAgICAgICAgZm9ybS5maW5kKCcuZm9ybS1ncm91cCcpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICBmb3JtLmZpbmQoJy5oZWxwLWJsb2NrJykuaHRtbCgnJyk7XHJcbiAgICB9XHJcblxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBEYW5paWwgb24gMjYuMDkuMjAxNi5cclxuICovXHJcbnZhciBDb21tZW50c0xpc3RWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xyXG5cclxuICAgIGVsOiBcIiNjb21tZW50c0xpc3RcIixcclxuXHJcbiAgICBldmVudHM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgXCJjaGFuZ2U6Y29tbWVudHNBcnJheVwiLCB0aGlzLnVwZGF0ZUxpc3QpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVMaXN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlIGxpc3QnKTtcclxuXHJcbiAgICAgICAgdmFyIGNvbW1lbnRzID0gdGhpcy5tb2RlbC5nZXQoJ2NvbW1lbnRzQXJyYXknKTtcclxuXHJcbiAgICAgICAgdmFyIGNvbW1lbnRSb3dUZW1wbGF0ZSA9Xy50ZW1wbGF0ZSgkKCcjY29tbWVudFJvdycpLmh0bWwoKSk7XHJcbiAgICAgICAgJCgnI2NvbW1lbnRzTGlzdCcpLmh0bWwoY29tbWVudFJvd1RlbXBsYXRlKHsnY29tbWVudHMnOmNvbW1lbnRzfSkpO1xyXG5cclxuICAgIH1cclxuXHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERhbmlpbCBvbiAyNi4wOS4yMDE2LlxyXG4gKi9cclxudmFyIENvbW1lbnRGb3JtTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xyXG5cclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgXCJuYW1lSW5wdXRcIjogIFwiXCIsXHJcbiAgICAgICAgXCJ0aGVtZUlucHV0XCI6ICAgICBcIlwiLFxyXG4gICAgICAgIFwiY29tbWVudElucHV0XCI6ICAgIFwiXCJcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMub24oXCJzeW5jXCIsIHRoaXMubW9kZWxTeW5jKTtcclxuICAgIH0sXHJcblxyXG4gICAgbW9kZWxTeW5jOmZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbW1lbnQgbW9kZWwgc3luYycpO1xyXG4gICAgICAgIGFwcC5jb21tZW50c0xpc3RNb2RlbC5hZGRPbmVDb21tZW50KHRoaXMudG9KU09OKCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cmxSb290OiBhcHAuc2VydmVyVXJsKycvY29tbWVudEZvcm0nXHJcblxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBEYW5paWwgb24gMjYuMDkuMjAxNi5cclxuICovXHJcbnZhciBDb21tZW50c0xpc3RNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XHJcblxyXG4gICAgZGVmYXVsdHM6IHtcclxuICAgICAgICBcImNvbW1lbnRzQXJyYXlcIjogIFtdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlTGlzdDpmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGlzLmZldGNoKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1vZGVsLCByZXNwb3NlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb3NlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChtb2RlbCwgeGhyLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZE9uZUNvbW1lbnQ6IGZ1bmN0aW9uIChjb21tZW50KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb21tZW50c0FyciA9IHRoaXMuZ2V0KCdjb21tZW50c0FycmF5Jyk7XHJcbiAgICAgICAgY29tbWVudHNBcnIudW5zaGlmdChjb21tZW50KTtcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZTpjb21tZW50c0FycmF5Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVybFJvb3Q6IGFwcC5zZXJ2ZXJVcmwrJy9jb21tZW50c0xpc3QnXHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
