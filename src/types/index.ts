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
