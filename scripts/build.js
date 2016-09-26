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
        "name":  "",
        "theme":     "",
        "comment":    ""
    }

});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb2RlbC9Db21tZW50Rm9ybU1vZGVsLmpzIiwidmlldy9Db21tZW50Rm9ybVZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKVxue1xuICAgIGNvbnNvbGUubG9nKCdzdGFydCcpO1xuICAgIHZhciBjb21tZW50TW9kZWwgPSBuZXcgQ29tbWVudEZvcm1Nb2RlbCgpO1xuICAgIHZhciBjb21tZW50VmlldyA9IG5ldyBDb21tZW50Rm9ybVZpZXcoe21vZGVsOiBjb21tZW50TW9kZWx9KTtcbn0pO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudEZvcm1Nb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XHJcblxyXG4gICAgZGVmYXVsdHM6IHtcclxuICAgICAgICBcIm5hbWVcIjogIFwiXCIsXHJcbiAgICAgICAgXCJ0aGVtZVwiOiAgICAgXCJcIixcclxuICAgICAgICBcImNvbW1lbnRcIjogICAgXCJcIlxyXG4gICAgfVxyXG5cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudEZvcm1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xyXG5cclxuICAgIGVsOiBcIiNjb21tZW50Rm9ybVwiLFxyXG5cclxuICAgIGV2ZW50czoge1xyXG4gICAgICAgIFwic3VibWl0IGZvcm1cIjogICAgICAgICAgXCJmb3JtU3VibWl0XCIsXHJcbiAgICAgICAgXCJjbGljayBidXR0b25cIjogICBcInJlbmRlclwiLFxyXG4gICAgICAgIFwiY2xpY2sgLmJ1dHRvbi5kZWxldGVcIjogXCJkZXN0cm95XCJcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCBcImNoYW5nZVwiLCB0aGlzLnJlbmRlcik7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy4kZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmb3JtU3VibWl0OmZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdCcpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyJyk7XHJcbiAgICB9XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
