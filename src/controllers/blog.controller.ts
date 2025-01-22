import { Elysia } from 'elysia';
import { blogService } from '../services/blog.service';
import { CreatePostBody } from '../types/blog.types';

export class BlogController {
  constructor(private app: Elysia) {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app
      .get('/posts', this.getAllPosts)
      .get('/posts/:id', this.getPostById)
      .post('/posts', this.createPost)
      .put('/posts/:id', this.updatePost)
      .delete('/posts/:id', this.deletePost);
  }

  private getAllPosts = () => ({
    posts: blogService.getAllPosts()
  });

  private getPostById = ({ params: { id } }: { params: { id: string } }) => {
    const post = blogService.getPostById(Number(id));
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }
    return post;
  };

  private createPost = ({ body }: { body: CreatePostBody }) => {
    return blogService.createPost(body);
  };

  private updatePost = ({ params: { id }, body }: { params: { id: string }, body: CreatePostBody }) => {
    const updatedPost = blogService.updatePost(Number(id), body);
    if (!updatedPost) {
      return new Response('Post not found', { status: 404 });
    }
    return updatedPost;
  };

  private deletePost = ({ params: { id } }: { params: { id: string } }) => {
    const deletedPost = blogService.deletePost(Number(id));
    if (!deletedPost) {
      return new Response('Post not found', { status: 404 });
    }
    return deletedPost;
  };
}
