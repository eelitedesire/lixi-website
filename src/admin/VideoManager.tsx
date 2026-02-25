import { useState, useEffect } from 'react';
import { adminApi } from '../services/api';
import { Save, Upload } from 'lucide-react';

const VideoManager = () => {
  const [video, setVideo] = useState({
    id: 'video-showcase',
    title: 'See LIXI in Action',
    subtitle: 'Experience the Future',
    videoUrl: '',
    thumbnailUrl: '',
    description: 'Discover how LIXI battery systems are transforming energy storage worldwide.'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await adminApi.list('video');
      if (data.length > 0) setVideo(data[0]);
    } catch {}
  };

  const handleSave = async () => {
    await adminApi.update('video', video);
    alert('Video settings saved!');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const url = await adminApi.upload(base64, file.name);
      setVideo({ ...video, thumbnailUrl: url });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-display text-brand-white mb-1">Video Showcase</h2>
        <p className="text-brand-white/60">Manage the video section on the home page</p>
      </div>

      <div className="bg-brand-grey border border-brand-greyMid rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-brand-white font-semibold mb-2">Subtitle</label>
          <input 
            className="input-field" 
            value={video.subtitle} 
            onChange={e => setVideo({ ...video, subtitle: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-brand-white font-semibold mb-2">Title</label>
          <input 
            className="input-field" 
            value={video.title} 
            onChange={e => setVideo({ ...video, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-brand-white font-semibold mb-2">Description</label>
          <textarea 
            className="input-field" 
            rows={3}
            value={video.description} 
            onChange={e => setVideo({ ...video, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-brand-white font-semibold mb-2">Video URL (YouTube/Vimeo)</label>
          <input 
            className="input-field" 
            placeholder="https://www.youtube.com/watch?v=..." 
            value={video.videoUrl} 
            onChange={e => setVideo({ ...video, videoUrl: e.target.value })}
          />
          <p className="text-brand-white/40 text-xs mt-1">Paste YouTube or Vimeo video URL</p>
        </div>

        <div>
          <label className="block text-brand-white font-semibold mb-2">Thumbnail Image</label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input 
                className="input-field" 
                placeholder="https://..." 
                value={video.thumbnailUrl} 
                onChange={e => setVideo({ ...video, thumbnailUrl: e.target.value })}
              />
            </div>
            <label className="bg-brand-green/20 text-brand-green px-4 py-3 rounded-lg cursor-pointer hover:bg-brand-green/30 transition flex items-center gap-2">
              <Upload size={18} />
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          {video.thumbnailUrl && (
            <img src={video.thumbnailUrl} alt="Thumbnail" className="mt-4 w-64 h-36 object-cover rounded-lg" />
          )}
        </div>

        <button 
          onClick={handleSave} 
          className="bg-brand-green text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDim transition flex items-center gap-2"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default VideoManager;
