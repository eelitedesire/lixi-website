import React, { useState } from 'react';
import { BlogPost } from '../data/blog';

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [category, setCategory] = useState(post?.category || '');
  const [date, setDate] = useState(post?.date || '');
  const [readTime, setReadTime] = useState(post?.readTime || '');
  const [content, setContent] = useState(post?.content || '');
  const [image, setImage] = useState<string | undefined>(post?.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      slug,
      title,
      excerpt,
      category,
      date,
      readTime,
      content,
      image,
    } as BlogPost);
    // Reset form if adding
    if (!post) {
      setTitle('');
      setSlug('');
      setExcerpt('');
      setCategory('');
      setDate('');
      setReadTime('');
      setContent('');
      setImage(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-2xl mx-auto mt-8 border border-brand-green/30">
      <h2 className="text-2xl font-bold mb-6">{post ? 'Edit' : 'Add'} Blog Post</h2>
      <div className="grid grid-cols-1 gap-4">
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} required />
        <input className="border border-brand-green/30 rounded p-2 bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Read Time" value={readTime} onChange={e => setReadTime(e.target.value)} required />
        <textarea className="border border-brand-green/30 rounded p-2 min-h-[120px] bg-brand-black text-brand-white placeholder:text-brand-white/60 focus:ring-2 focus:ring-brand-green" placeholder="Content (Markdown supported)" value={content} onChange={e => setContent(e.target.value)} required />
        <div>
          <label className="block mb-2 font-semibold text-brand-white">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="bg-brand-black text-brand-white border border-brand-green/30 rounded p-2" />
          {image && <img src={image} alt="Preview" className="mt-2 rounded max-h-40" />}
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-900 font-semibold">Save</button>
        <button type="button" className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 font-semibold" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default BlogEditor;
