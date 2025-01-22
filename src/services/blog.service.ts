import { BlogPost, CreatePostBody } from '../types/blog.types';

class BlogService {
  private posts: BlogPost[] = [
    {
      id: 1,
      title: 'Welcome to Bun Blog API',
      content: 'This is your first blog post!',
      date: new Date().toISOString()
    }
  ];

  getAllPosts(): BlogPost[] {
    return this.posts;
  }

  getPostById(id: number): BlogPost | undefined {
    return this.posts.find(p => p.id === id);
  }

  createPost(postData: CreatePostBody): BlogPost {
    const newPost: BlogPost = {
      id: this.posts.length + 1,
      title: postData.title,
      content: postData.content,
      date: new Date().toISOString(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(id: number, postData: CreatePostBody): BlogPost | undefined {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    
    this.posts[index] = {
      ...this.posts[index],
      title: postData.title,
      content: postData.content
    };
    
    return this.posts[index];
  }

  deletePost(id: number): BlogPost | undefined {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    
    const [deletedPost] = this.posts.splice(index, 1);
    return deletedPost;
  }
}

export const blogService = new BlogService();
