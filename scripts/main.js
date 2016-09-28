
$(function ()
{
    console.log('start');
    var commentModel = new CommentFormModel();
    var commentView = new CommentFormView({model: commentModel});

    var commentsListModel = new CommentsListModel();
    var commentsListView = new CommentsListView({model: commentsListModel});
});
