export type PostProps = {
    id: string;
    title: string;
}

export interface PostProp extends React.HTMLAttributes<HTMLDivElement> {
  post: PostProps;
  innerRef: React.Ref<HTMLParagraphElement>;
}