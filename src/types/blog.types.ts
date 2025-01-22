export type BlogPost = {
  id: number;
  title: string;
  content: string;
  date: string;
}

export type CreatePostBody = {
  title: string;
  content: string;
}
