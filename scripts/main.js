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
