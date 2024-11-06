export type PostProps = {
  id: string;
  title: string;
  userId: string;
};

export type ReplyProps = {
  id: string;
  body: string;
  email: string;
};

export interface PostProp extends React.HTMLAttributes<HTMLDivElement> {
  post: PostProps;
  innerRef?: React.Ref<HTMLParagraphElement>;
}
