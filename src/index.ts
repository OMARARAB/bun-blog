import { Elysia } from 'elysia';

// Define types
type BlogPost = {
  id: number;
  title: string;
  content: string;
  date: string;
}

type CreatePostBody = {
  title: string;
  content: string;
}

// In-memory store for blog posts (replace with a database in production)
const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Welcome to Bun Blog API',
    content: 'This is your first blog post!',
    date: new Date().toISOString()
  }
];

const app = new Elysia()
  // GET all posts
  .get('/posts', () => ({
    posts
  }))
  
  // GET single post by ID
  .get('/posts/:id', ({ params: { id } }) => {
    const post = posts.find(p => p.id === Number(id));
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }
    return post;
  })

  // CREATE new post
  .post('/posts', ({ body }: { body: CreatePostBody }) => {
    const newPost: BlogPost = {
      id: posts.length + 1,
      title: body.title,
      content: body.content,
      date: new Date().toISOString(),
    };
    posts.push(newPost);
    return newPost;
  })

  // UPDATE post
  .put('/posts/:id', ({ params: { id }, body }: { params: { id: string }, body: CreatePostBody }) => {
    const index = posts.findIndex(p => p.id === Number(id));
    if (index === -1) {
      return new Response('Post not found', { status: 404 });
    }
    
    posts[index] = {
      ...posts[index],
      title: body.title,
      content: body.content
    };
    
    return posts[index];
  })

  // DELETE post
  .delete('/posts/:id', ({ params: { id } }) => {
    const index = posts.findIndex(p => p.id === Number(id));
    if (index === -1) {
      return new Response('Post not found', { status: 404 });
    }
    
    const deletedPost = posts.splice(index, 1)[0];
    return deletedPost;
  })
  
  .listen(3000);

console.log(`🦊 Blog API is running at http://localhost:${app.server?.port}`);
