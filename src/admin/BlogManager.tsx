import { useState, useEffect } from 'react';
import { blogPosts, BlogPost } from '../data/blog';
import BlogEditor from './BlogEditor';
import { Plus } from 'lucide-react';
import { adminApi } from '../services/api';

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    adminApi.list('blog').then(data => setPosts(data.length ? data : blogPosts)).catch(() => setPosts(blogPosts));
  }, []);

  const handleSave = async (post: BlogPost) => {
    if (editing) {
      await adminApi.update('blog', post);
      setPosts(posts.map(p => (p.slug === editing.slug ? post : p)));
    } else {
      await adminApi.create('blog', { ...post, id: post.slug });
      setPosts([post, ...posts]);
    }
    setEditing(null);
    setAdding(false);
  };

  const handleDelete = async (slug: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await adminApi.delete('blog', slug);
      setPosts(posts.filter(p => p.slug !== slug));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-brand-white mb-1">Blog Management</h2>
          <p className="text-brand-white/60">{posts.length} posts total</p>
        </div>
        <button
          className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2"
          onClick={() => { setAdding(true); setEditing(null); }}
        >
          <Plus className="w-5 h-5" />
          Add New Post
        </button>
      </div>

      {(adding || editing) ? (
        <BlogEditor
          post={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setAdding(false); setEditing(null); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post.slug} className="bg-brand-grey border border-brand-greyMid rounded-xl overflow-hidden hover:border-brand-green/50 transition">
              {post.image && (
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <span className="inline-block bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold mb-3">{post.category}</span>
                <h3 className="text-lg font-bold text-brand-white mb-2">{post.title}</h3>
                <p className="text-sm text-brand-white/60 mb-2">{post.date} • {post.readTime}</p>
                <p className="text-sm text-brand-white/80 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg hover:bg-brand-green/20 font-semibold transition"
                    onClick={() => setEditing(post)}
                  >Edit</button>
                  <button
                    className="flex-1 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 font-semibold transition"
                    onClick={() => handleDelete(post.slug)}
                  >Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager;
