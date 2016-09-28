
$(function ()
{
    console.log('start');
    var commentModel = new CommentFormModel();
    var commentView = new CommentFormView({model: commentModel});

    var commentsListModel = new CommentsListModel();
    var commentsListView = new CommentsListView({model: commentsListModel});
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
        // this.on("sync", this.updateList);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2RlbC9Db21tZW50Rm9ybU1vZGVsLmpzIiwibW9kZWwvQ29tbWVudHNMaXN0TW9kZWwuanMiLCJ2aWV3L0NvbW1lbnRGb3JtVmlldy5qcyIsInZpZXcvQ29tbWVudHNMaXN0Vmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4kKGZ1bmN0aW9uICgpXG57XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0Jyk7XG4gICAgdmFyIGNvbW1lbnRNb2RlbCA9IG5ldyBDb21tZW50Rm9ybU1vZGVsKCk7XG4gICAgdmFyIGNvbW1lbnRWaWV3ID0gbmV3IENvbW1lbnRGb3JtVmlldyh7bW9kZWw6IGNvbW1lbnRNb2RlbH0pO1xuXG4gICAgdmFyIGNvbW1lbnRzTGlzdE1vZGVsID0gbmV3IENvbW1lbnRzTGlzdE1vZGVsKCk7XG4gICAgdmFyIGNvbW1lbnRzTGlzdFZpZXcgPSBuZXcgQ29tbWVudHNMaXN0Vmlldyh7bW9kZWw6IGNvbW1lbnRzTGlzdE1vZGVsfSk7XG59KTtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERhbmlpbCBvbiAyNi4wOS4yMDE2LlxyXG4gKi9cclxudmFyIENvbW1lbnRGb3JtTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xyXG5cclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgXCJuYW1lSW5wdXRcIjogIFwiXCIsXHJcbiAgICAgICAgXCJ0aGVtZUlucHV0XCI6ICAgICBcIlwiLFxyXG4gICAgICAgIFwiY29tbWVudElucHV0XCI6ICAgIFwiXCJcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHRoaXMub24oXCJzeW5jXCIsIHRoaXMudXBkYXRlTGlzdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVybFJvb3Q6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2NvbW1lbnRGb3JtJ1xyXG5cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudHNMaXN0TW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xyXG5cclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgXCJjb21tZW50c0FycmF5XCI6ICBbXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUxpc3Q6ZnVuY3Rpb24gKClcclxuICAgIHsgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZmV0Y2goe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobW9kZWwsIHJlc3Bvc2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3Bvc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKG1vZGVsLCB4aHIsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhocik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXJsUm9vdDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvY29tbWVudHNMaXN0J1xyXG5cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudEZvcm1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xyXG5cclxuICAgIGVsOiBcIiNjb21tZW50Rm9ybVwiLFxyXG5cclxuICAgIGV2ZW50czoge1xyXG4gICAgICAgIFwic3VibWl0IGZvcm1cIjogICAgICAgICAgXCJmb3JtU3VibWl0XCIsXHJcbiAgICAgICAgXCJjaGFuZ2UgaW5wdXQsIHRleHRhcmVhXCI6ICAgXCJjaGFuZ2VJbnB1dFwiXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgXCJjaGFuZ2VcIiwgdGhpcy5yZW5kZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgXCJzeW5jXCIsIHRoaXMuc3luYyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZvcm1TdWJtaXQ6ZnVuY3Rpb24gKGUpXHJcbiAgICB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzdWJtaXQnKTtcclxuICAgICAgICB0aGlzLm1vZGVsLnNhdmUoe30sIHsvL1RPRE86IG1ha2UgdmFsaWRhdGUgaW4gbW9kZWxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1vZGVsLCByZXNwb3NlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc2VydmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAobW9kZWwsIHhociwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBzYXZpbmcgdGhlIG1vZGVsXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VJbnB1dDpmdW5jdGlvbiAoZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgZWxlbSA9ICAkKGUudGFyZ2V0KTtcclxuICAgICAgICBsZXQgbmFtZVZhbCA9IGVsZW0uYXR0cignaWQnKTtcclxuICAgICAgICBsZXQgdGVtcE9iaiA9IHt9O1xyXG4gICAgICAgIHRlbXBPYmpbbmFtZVZhbF0gPSBlbGVtLnZhbCgpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2V0KHRlbXBPYmopO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vZGVsLnRvSlNPTigpKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN5bmM6ZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coXCJzeW5jIGNvbW1lbnQgbW9kZWxcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlbmRlcicpO1xyXG4gICAgfVxyXG5cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudHNMaXN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcclxuXHJcbiAgICBlbDogXCIjY29tbWVudHNMaXN0XCIsXHJcblxyXG4gICAgZXZlbnRzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsIFwiY2hhbmdlOmNvbW1lbnRzQXJyYXlcIiwgdGhpcy51cGRhdGVMaXN0KTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlTGlzdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZSBsaXN0Jyk7XHJcblxyXG4gICAgICAgIHZhciBjb21tZW50cyA9IHRoaXMubW9kZWwuZ2V0KCdjb21tZW50c0FycmF5Jyk7XHJcblxyXG4gICAgICAgIHZhciBjb21tZW50Um93VGVtcGxhdGUgPV8udGVtcGxhdGUoJCgnI2NvbW1lbnRSb3cnKS5odG1sKCkpO1xyXG4gICAgICAgICQoJyNjb21tZW50c0xpc3QnKS5odG1sKGNvbW1lbnRSb3dUZW1wbGF0ZSh7J2NvbW1lbnRzJzpjb21tZW50c30pKTtcclxuXHJcbiAgICB9XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
