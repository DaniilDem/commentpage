var app =
{
    commentModel:{},
    commentsListModel: {}
}

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

    urlRoot: 'http://localhost:1337/api/commentForm'

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
        commentsArr.push(comment);
        this.trigger('change:commentsArray');
    },

    urlRoot: 'http://localhost:1337/api/commentsList'

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
        var elem =  $(e.target);
        var nameVal = elem.attr('id');
        var tempObj = {};
        tempObj[nameVal] = elem.val();
        this.model.set(tempObj);

        console.log(this.model.toJSON());

    },

    render: function() {
        console.log('render');
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
        $('#commentsList').html(commentRowTemplate({'comments':comments.reverse()}));

    }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2RlbC9Db21tZW50Rm9ybU1vZGVsLmpzIiwibW9kZWwvQ29tbWVudHNMaXN0TW9kZWwuanMiLCJ2aWV3L0NvbW1lbnRGb3JtVmlldy5qcyIsInZpZXcvQ29tbWVudHNMaXN0Vmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID1cbntcbiAgICBjb21tZW50TW9kZWw6e30sXG4gICAgY29tbWVudHNMaXN0TW9kZWw6IHt9XG59XG5cbiQoZnVuY3Rpb24gKClcbntcbiAgICBjb25zb2xlLmxvZygnc3RhcnQnKTtcbiAgICBhcHAuY29tbWVudE1vZGVsID0gbmV3IENvbW1lbnRGb3JtTW9kZWwoKTtcbiAgICB2YXIgY29tbWVudFZpZXcgPSBuZXcgQ29tbWVudEZvcm1WaWV3KHttb2RlbDogYXBwLmNvbW1lbnRNb2RlbH0pO1xuXG4gICAgYXBwLmNvbW1lbnRzTGlzdE1vZGVsID0gbmV3IENvbW1lbnRzTGlzdE1vZGVsKCk7XG4gICAgdmFyIGNvbW1lbnRzTGlzdFZpZXcgPSBuZXcgQ29tbWVudHNMaXN0Vmlldyh7bW9kZWw6IGFwcC5jb21tZW50c0xpc3RNb2RlbH0pO1xufSk7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBEYW5paWwgb24gMjYuMDkuMjAxNi5cclxuICovXHJcbnZhciBDb21tZW50Rm9ybU1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcclxuXHJcbiAgICBkZWZhdWx0czoge1xyXG4gICAgICAgIFwibmFtZUlucHV0XCI6ICBcIlwiLFxyXG4gICAgICAgIFwidGhlbWVJbnB1dFwiOiAgICAgXCJcIixcclxuICAgICAgICBcImNvbW1lbnRJbnB1dFwiOiAgICBcIlwiXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLm9uKFwic3luY1wiLCB0aGlzLm1vZGVsU3luYyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGVsU3luYzpmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjb21tZW50IG1vZGVsIHN5bmMnKTtcclxuICAgICAgICBhcHAuY29tbWVudHNMaXN0TW9kZWwuYWRkT25lQ29tbWVudCh0aGlzLnRvSlNPTigpKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXJsUm9vdDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvY29tbWVudEZvcm0nXHJcblxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBEYW5paWwgb24gMjYuMDkuMjAxNi5cclxuICovXHJcbnZhciBDb21tZW50c0xpc3RNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XHJcblxyXG4gICAgZGVmYXVsdHM6IHtcclxuICAgICAgICBcImNvbW1lbnRzQXJyYXlcIjogIFtdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlTGlzdDpmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGlzLmZldGNoKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1vZGVsLCByZXNwb3NlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb3NlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChtb2RlbCwgeGhyLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZE9uZUNvbW1lbnQ6IGZ1bmN0aW9uIChjb21tZW50KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb21tZW50c0FyciA9IHRoaXMuZ2V0KCdjb21tZW50c0FycmF5Jyk7XHJcbiAgICAgICAgY29tbWVudHNBcnIucHVzaChjb21tZW50KTtcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZTpjb21tZW50c0FycmF5Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVybFJvb3Q6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2NvbW1lbnRzTGlzdCdcclxuXHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERhbmlpbCBvbiAyNi4wOS4yMDE2LlxyXG4gKi9cclxudmFyIENvbW1lbnRGb3JtVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcclxuXHJcbiAgICBlbDogXCIjY29tbWVudEZvcm1cIixcclxuXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgICBcInN1Ym1pdCBmb3JtXCI6ICAgICAgICAgIFwiZm9ybVN1Ym1pdFwiLFxyXG4gICAgICAgIFwiY2hhbmdlIGlucHV0LCB0ZXh0YXJlYVwiOiAgIFwiY2hhbmdlSW5wdXRcIlxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsIFwiY2hhbmdlXCIsIHRoaXMucmVuZGVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgZm9ybVN1Ym1pdDpmdW5jdGlvbiAoZSlcclxuICAgIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdCcpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2F2ZSh7fSwgey8vVE9ETzogbWFrZSB2YWxpZGF0ZSBpbiBtb2RlbFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobW9kZWwsIHJlc3Bvc2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIG1vZGVsIGhhcyBiZWVuIHNhdmVkIHRvIHRoZSBzZXJ2ZXJcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb3NlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChtb2RlbCwgeGhyLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIHNhdmluZyB0aGUgbW9kZWxcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh4aHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoYW5nZUlucHV0OmZ1bmN0aW9uIChlKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBlbGVtID0gICQoZS50YXJnZXQpO1xyXG4gICAgICAgIHZhciBuYW1lVmFsID0gZWxlbS5hdHRyKCdpZCcpO1xyXG4gICAgICAgIHZhciB0ZW1wT2JqID0ge307XHJcbiAgICAgICAgdGVtcE9ialtuYW1lVmFsXSA9IGVsZW0udmFsKCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5zZXQodGVtcE9iaik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW9kZWwudG9KU09OKCkpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyJyk7XHJcbiAgICB9XHJcblxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBEYW5paWwgb24gMjYuMDkuMjAxNi5cclxuICovXHJcbnZhciBDb21tZW50c0xpc3RWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xyXG5cclxuICAgIGVsOiBcIiNjb21tZW50c0xpc3RcIixcclxuXHJcbiAgICBldmVudHM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgXCJjaGFuZ2U6Y29tbWVudHNBcnJheVwiLCB0aGlzLnVwZGF0ZUxpc3QpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVMaXN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlIGxpc3QnKTtcclxuXHJcbiAgICAgICAgdmFyIGNvbW1lbnRzID0gdGhpcy5tb2RlbC5nZXQoJ2NvbW1lbnRzQXJyYXknKTtcclxuXHJcbiAgICAgICAgdmFyIGNvbW1lbnRSb3dUZW1wbGF0ZSA9Xy50ZW1wbGF0ZSgkKCcjY29tbWVudFJvdycpLmh0bWwoKSk7XHJcbiAgICAgICAgJCgnI2NvbW1lbnRzTGlzdCcpLmh0bWwoY29tbWVudFJvd1RlbXBsYXRlKHsnY29tbWVudHMnOmNvbW1lbnRzLnJldmVyc2UoKX0pKTtcclxuXHJcbiAgICB9XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
