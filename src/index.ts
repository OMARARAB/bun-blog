import { Elysia } from 'elysia';
import { BlogController } from './controllers/blog.controller';

const app = new Elysia();

// Initialize controllers
new BlogController(app);

// Start the server
app.listen(3000);

console.log(`🦊 Blog API is running at http://localhost:${app.server?.port}`);
