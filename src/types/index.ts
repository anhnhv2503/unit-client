export type PostProps = {
  userId: string;
  postId: string;
  content: string;
  media: string[];
  createdAt: string;
  lastModified: string;
  isHidden: boolean;
  likeCount: number;
  commentCount: number;
  reactions: Reaction[];
  profilePicture?: string;
  userName?: string;
  isLiked: boolean;
};

export interface MediaItem {
  url: string;
  type: "video" | "image";
}

interface Reaction {
  // Define properties of Reaction if they exist. If unknown, you can use `any` or leave it as an empty object `{}`.
}

export type ReplyProps = {
  id: string;
  body: string;
  email: string;
};

export interface PostProp extends React.HTMLAttributes<HTMLDivElement> {
  post: PostProps;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

export interface CommentResponse {
  AuthorId: string;
  AuthorUserName: string;
  ProfilePicture: string;
  PostId: string;
  CommentId: string;
  Content: string;
  CreatedAt: string; // Use `Date` if you parse the string into a Date object
  UpdatedAt: string; // Use `Date` if you parse the string into a Date object
  Attachments: any[]; // Replace `any` with the actual type if you know the structure of the attachments
  Mentions: any[]; // Replace `any` with the actual type if you know the structure of mentions
  LikeCount: number;
  Metadata: {
    isEdited: boolean;
    likes: any[]; // Replace `any` with the actual type if likes have a defined structure
    replies: number;
  };
  Tags: string[];
}
