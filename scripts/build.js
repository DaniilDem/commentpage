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
        $('#commentsList').html(commentRowTemplate({'comments':comments}));

    }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2RlbC9Db21tZW50Rm9ybU1vZGVsLmpzIiwibW9kZWwvQ29tbWVudHNMaXN0TW9kZWwuanMiLCJ2aWV3L0NvbW1lbnRGb3JtVmlldy5qcyIsInZpZXcvQ29tbWVudHNMaXN0Vmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID1cbntcbiAgICBjb21tZW50TW9kZWw6e30sXG4gICAgY29tbWVudHNMaXN0TW9kZWw6IHt9LFxuICAgIHNlcnZlclVybDonaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaSdcbn07XG5cbiQoZnVuY3Rpb24gKClcbntcbiAgICBjb25zb2xlLmxvZygnc3RhcnQnKTtcbiAgICBhcHAuY29tbWVudE1vZGVsID0gbmV3IENvbW1lbnRGb3JtTW9kZWwoKTtcbiAgICB2YXIgY29tbWVudFZpZXcgPSBuZXcgQ29tbWVudEZvcm1WaWV3KHttb2RlbDogYXBwLmNvbW1lbnRNb2RlbH0pO1xuXG4gICAgYXBwLmNvbW1lbnRzTGlzdE1vZGVsID0gbmV3IENvbW1lbnRzTGlzdE1vZGVsKCk7XG4gICAgdmFyIGNvbW1lbnRzTGlzdFZpZXcgPSBuZXcgQ29tbWVudHNMaXN0Vmlldyh7bW9kZWw6IGFwcC5jb21tZW50c0xpc3RNb2RlbH0pO1xufSk7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBEYW5paWwgb24gMjYuMDkuMjAxNi5cclxuICovXHJcbnZhciBDb21tZW50Rm9ybU1vZGVsID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcclxuXHJcbiAgICBkZWZhdWx0czoge1xyXG4gICAgICAgIFwibmFtZUlucHV0XCI6ICBcIlwiLFxyXG4gICAgICAgIFwidGhlbWVJbnB1dFwiOiAgICAgXCJcIixcclxuICAgICAgICBcImNvbW1lbnRJbnB1dFwiOiAgICBcIlwiXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLm9uKFwic3luY1wiLCB0aGlzLm1vZGVsU3luYyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGVsU3luYzpmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjb21tZW50IG1vZGVsIHN5bmMnKTtcclxuICAgICAgICBhcHAuY29tbWVudHNMaXN0TW9kZWwuYWRkT25lQ29tbWVudCh0aGlzLnRvSlNPTigpKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXJsUm9vdDogYXBwLnNlcnZlclVybCsnL2NvbW1lbnRGb3JtJ1xyXG5cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudHNMaXN0TW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xyXG5cclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgXCJjb21tZW50c0FycmF5XCI6ICBbXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUxpc3Q6ZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5mZXRjaCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtb2RlbCwgcmVzcG9zZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAobW9kZWwsIHhociwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRPbmVDb21tZW50OiBmdW5jdGlvbiAoY29tbWVudClcclxuICAgIHtcclxuICAgICAgICB2YXIgY29tbWVudHNBcnIgPSB0aGlzLmdldCgnY29tbWVudHNBcnJheScpO1xyXG4gICAgICAgIGNvbW1lbnRzQXJyLnVuc2hpZnQoY29tbWVudCk7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdjaGFuZ2U6Y29tbWVudHNBcnJheScpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cmxSb290OiBhcHAuc2VydmVyVXJsKycvY29tbWVudHNMaXN0J1xyXG5cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudEZvcm1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xyXG5cclxuICAgIGVsOiBcIiNjb21tZW50Rm9ybVwiLFxyXG5cclxuICAgIGV2ZW50czoge1xyXG4gICAgICAgIFwic3VibWl0IGZvcm1cIjogICAgICAgICAgXCJmb3JtU3VibWl0XCIsXHJcbiAgICAgICAgXCJjaGFuZ2UgaW5wdXQsIHRleHRhcmVhXCI6ICAgXCJjaGFuZ2VJbnB1dFwiXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgXCJjaGFuZ2VcIiwgdGhpcy5yZW5kZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb3JtU3VibWl0OmZ1bmN0aW9uIChlKVxyXG4gICAge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnc3VibWl0Jyk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5zYXZlKHt9LCB7Ly9UT0RPOiBtYWtlIHZhbGlkYXRlIGluIG1vZGVsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtb2RlbCwgcmVzcG9zZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgbW9kZWwgaGFzIGJlZW4gc2F2ZWQgdG8gdGhlIHNlcnZlclwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3Bvc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKG1vZGVsLCB4aHIsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgc2F2aW5nIHRoZSBtb2RlbFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hhbmdlSW5wdXQ6ZnVuY3Rpb24gKGUpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSAgJChlLnRhcmdldCk7XHJcbiAgICAgICAgdmFyIG5hbWVWYWwgPSBlbGVtLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgdmFyIHRlbXBPYmogPSB7fTtcclxuICAgICAgICB0ZW1wT2JqW25hbWVWYWxdID0gZWxlbS52YWwoKTtcclxuICAgICAgICB0aGlzLm1vZGVsLnNldCh0ZW1wT2JqKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tb2RlbC50b0pTT04oKSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXInKTtcclxuICAgIH1cclxuXHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERhbmlpbCBvbiAyNi4wOS4yMDE2LlxyXG4gKi9cclxudmFyIENvbW1lbnRzTGlzdFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XHJcblxyXG4gICAgZWw6IFwiI2NvbW1lbnRzTGlzdFwiLFxyXG5cclxuICAgIGV2ZW50czoge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCBcImNoYW5nZTpjb21tZW50c0FycmF5XCIsIHRoaXMudXBkYXRlTGlzdCk7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUxpc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgbGlzdCcpO1xyXG5cclxuICAgICAgICB2YXIgY29tbWVudHMgPSB0aGlzLm1vZGVsLmdldCgnY29tbWVudHNBcnJheScpO1xyXG5cclxuICAgICAgICB2YXIgY29tbWVudFJvd1RlbXBsYXRlID1fLnRlbXBsYXRlKCQoJyNjb21tZW50Um93JykuaHRtbCgpKTtcclxuICAgICAgICAkKCcjY29tbWVudHNMaXN0JykuaHRtbChjb21tZW50Um93VGVtcGxhdGUoeydjb21tZW50cyc6Y29tbWVudHN9KSk7XHJcblxyXG4gICAgfVxyXG5cclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
