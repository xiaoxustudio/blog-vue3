// 聊天数据
export interface ChatData {
    user_id: string;
    msg: string;
    time: string;
    $user?: UserData;
}
// 用户数据
export interface UserData {
    id: string;
    user_id: string;
    nickname: string;
    username: string;
    password: string;
    login_time: string;
    group: string;
    token: string;
    avatar: string;
}
// 分类数据
export interface ClassData {
    id: string;
    class_id: string;
    class_name: string;
    class_desc: string;
}
// 评论数据
export interface CommentData {
    comment_id: string;
    comment_content: string;
    comment_like: string;
    comment_author_id: string;
    comment_article_id: string;
    comment_time: string;
    $user?: UserData;
    $article?: ArticleData;
}
// 文章数据
export interface ArticleData {
    id: string;
    article_class: string;
    article_id: string;
    article_title: string;
    article_content: string;
    article_see: string;
    article_time: string;
    author_id: string;
    article_tags: string;
    $user?: UserData;
    $class?: ClassData;
    $comments?: CommentData[];
}
