$(function ()
{
    console.log('start');
    var commentModel = new CommentFormModel();
    var commentView = new CommentFormView({model: commentModel});
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
      alert("sync");
    },

    render: function() {
        console.log('render');
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

    urlRoot: 'http://localhost:1337/api/commentForm'

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJ2aWV3L0NvbW1lbnRGb3JtVmlldy5qcyIsIm1vZGVsL0NvbW1lbnRGb3JtTW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKVxue1xuICAgIGNvbnNvbGUubG9nKCdzdGFydCcpO1xuICAgIHZhciBjb21tZW50TW9kZWwgPSBuZXcgQ29tbWVudEZvcm1Nb2RlbCgpO1xuICAgIHZhciBjb21tZW50VmlldyA9IG5ldyBDb21tZW50Rm9ybVZpZXcoe21vZGVsOiBjb21tZW50TW9kZWx9KTtcbn0pO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgRGFuaWlsIG9uIDI2LjA5LjIwMTYuXHJcbiAqL1xyXG52YXIgQ29tbWVudEZvcm1WaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xyXG5cclxuICAgIGVsOiBcIiNjb21tZW50Rm9ybVwiLFxyXG5cclxuICAgIGV2ZW50czoge1xyXG4gICAgICAgIFwic3VibWl0IGZvcm1cIjogICAgICAgICAgXCJmb3JtU3VibWl0XCIsXHJcbiAgICAgICAgXCJjaGFuZ2UgaW5wdXQsIHRleHRhcmVhXCI6ICAgXCJjaGFuZ2VJbnB1dFwiXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgXCJjaGFuZ2VcIiwgdGhpcy5yZW5kZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgXCJzeW5jXCIsIHRoaXMuc3luYyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZvcm1TdWJtaXQ6ZnVuY3Rpb24gKGUpXHJcbiAgICB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzdWJtaXQnKTtcclxuICAgICAgICB0aGlzLm1vZGVsLnNhdmUoe30sIHsvL1RPRE86IG1ha2UgdmFsaWRhdGUgaW4gbW9kZWxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1vZGVsLCByZXNwb3NlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZCB0byB0aGUgc2VydmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAobW9kZWwsIHhociwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBzYXZpbmcgdGhlIG1vZGVsXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeGhyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VJbnB1dDpmdW5jdGlvbiAoZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgZWxlbSA9ICAkKGUudGFyZ2V0KTtcclxuICAgICAgICBsZXQgbmFtZVZhbCA9IGVsZW0uYXR0cignaWQnKTtcclxuICAgICAgICBsZXQgdGVtcE9iaiA9IHt9O1xyXG4gICAgICAgIHRlbXBPYmpbbmFtZVZhbF0gPSBlbGVtLnZhbCgpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2V0KHRlbXBPYmopO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vZGVsLnRvSlNPTigpKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN5bmM6ZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgYWxlcnQoXCJzeW5jXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXInKTtcclxuICAgIH1cclxuXHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IERhbmlpbCBvbiAyNi4wOS4yMDE2LlxyXG4gKi9cclxudmFyIENvbW1lbnRGb3JtTW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xyXG5cclxuICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgXCJuYW1lSW5wdXRcIjogIFwiXCIsXHJcbiAgICAgICAgXCJ0aGVtZUlucHV0XCI6ICAgICBcIlwiLFxyXG4gICAgICAgIFwiY29tbWVudElucHV0XCI6ICAgIFwiXCJcclxuICAgIH0sXHJcblxyXG4gICAgdXJsUm9vdDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvY29tbWVudEZvcm0nXHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
