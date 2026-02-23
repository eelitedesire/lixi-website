import { useState } from 'react';
import { blogPosts, BlogPost } from '../data/blog';
import BlogEditor from './BlogEditor';


const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [adding, setAdding] = useState(false);

  const handleSave = (post: BlogPost) => {
    if (editing) {
      setPosts(posts.map(p => (p.slug === editing.slug ? post : p)));
      setEditing(null);
      setAdding(false);
    } else {
      setPosts([{ ...post }, ...posts]);
      setAdding(false);
      setEditing(null);
    }
  };

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.slug !== slug));
    }
  };

  return (
    <div className="min-h-screen w-full bg-brand-black/95 backdrop-blur-md py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow">Blog Management</h2>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => { setAdding(true); setEditing(null); }}
          >
            + Add New Post
          </button>
        </div>

        {(adding || editing) ? (
          <BlogEditor
            post={editing || undefined}
            onSave={(post) => {
              handleSave(post);
              setAdding(false);
              setEditing(null);
            }}
            onCancel={() => { setAdding(false); setEditing(null); }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map(post => (
              <div key={post.slug} className="bg-brand-black/90 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col gap-2 border border-brand-green/30 relative">
                {post.image && (
                  <img src={post.image} alt={post.title} className="rounded-xl mb-3 max-h-40 object-cover w-full border border-brand-green/20" />
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-brand-green">{post.title}</span>
                  <span className="text-xs text-brand-green/80">{post.date} • {post.readTime}</span>
                  <span className="text-sm text-brand-white/80 mb-2">{post.excerpt}</span>
                  <span className="inline-block bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-semibold w-fit">{post.category}</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-brand-green text-brand-black px-4 py-1 rounded hover:bg-brand-green/80 font-semibold shadow"
                    onClick={() => setEditing(post)}
                  >Edit</button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 font-semibold shadow"
                    onClick={() => handleDelete(post.slug)}
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
