export class ArticleModel{
    id: number;
    postedby: string;
    postedByImage: string;
    postedOn: string;
    postedByGender: number;
    title: string;
    content: string;
    totalLikes: number;
    totalComments: number;
    totalReplies: number;
    isLiked: boolean;
    lastComment: {userid: number; userimage: string; commentcontent: string; };



  }