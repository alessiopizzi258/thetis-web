import { Play } from 'lucide-react';

const VisionCard = ({ title, description, image }) => (
  <div className="group relative overflow-hidden rounded-sm bg-midnight aspect-[4/5] cursor-pointer">
    {/* Background Image */}
    <img 
      src={image} 
      alt={title}
      className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
    />
    
    {/* Play Icon Overlay */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
      <div className="w-16 h-16 border border-ivory rounded-full flex items-center justify-center backdrop-blur-sm">
        <Play className="text-ivory fill-ivory" size={24} />
      </div>
    </div>

    {/* Text Content */}
    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-midnight via-transparent to-transparent">
      <h3 className="text-2xl font-serif text-ivory mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
        {title}
      </h3>
      <p className="text-sm text-ivory/80 font-light italic opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-2">
        {description}
      </p>
    </div>
  </div>
);

export default VisionCard;