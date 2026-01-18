import ReactPlayer from 'react-player';
import { X } from 'lucide-react';

// --- VISIONI (Con Modal) ---
export const Visioni = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <PageWrapper>
      <h2 className="font-serif text-4xl mb-16">Visioni</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {siteData.visioni.map((v) => (
          <div key={v.id} className="group cursor-pointer" onClick={() => setSelectedVideo(v.videoUrl)}>
            <div className="overflow-hidden aspect-[3/4] bg-gray-100">
              <img 
                src={v.locandina} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={v.titolo} 
              />
            </div>
            <h3 className="mt-4 font-serif text-xl italic">{v.titolo}</h3>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 md:p-20">
          <button onClick={() => setSelectedVideo(null)} className="absolute top-10 right-10">
            <X size={32} strokeWidth={1} />
          </button>
          <div className="w-full h-full max-w-5xl">
            <ReactPlayer url={selectedVideo} width="100%" height="100%" controls />
          </div>
        </div>
      )}
    </PageWrapper>
  );
};