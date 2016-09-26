$(function ()
{
    console.log('start');
    var commentModel = new CommentFormModel();
    var commentView = new CommentFormView({model: commentModel});
});
