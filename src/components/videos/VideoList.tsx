import { Play, ExternalLink, Clock, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
  url: string;
}

const recentVideos: Video[] = [
  {
    id: "1",
    title: "How to Start Composting at Home - Complete Beginner's Guide",
    channel: "Eco Living Tips",
    thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=640&h=360&fit=crop",
    duration: "12:34",
    views: "1.2M",
    publishedAt: "2 days ago",
    url: "https://youtube.com",
  },
  {
    id: "2",
    title: "The Future of Renewable Energy - Solar Revolution 2025",
    channel: "Green Tech Today",
    thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=640&h=360&fit=crop",
    duration: "18:45",
    views: "856K",
    publishedAt: "5 days ago",
    url: "https://youtube.com",
  },
  {
    id: "3",
    title: "Zero Waste Kitchen - 15 Tips to Reduce Food Waste",
    channel: "Sustainable Living",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=640&h=360&fit=crop",
    duration: "10:22",
    views: "543K",
    publishedAt: "1 week ago",
    url: "https://youtube.com",
  },
  {
    id: "4",
    title: "India's Plastic Pollution Crisis - Documentary",
    channel: "Environment Watch",
    thumbnail: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=640&h=360&fit=crop",
    duration: "45:12",
    views: "2.1M",
    publishedAt: "2 weeks ago",
    url: "https://youtube.com",
  },
  {
    id: "5",
    title: "Urban Gardening in Small Spaces - Apartment Edition",
    channel: "City Gardener",
    thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=640&h=360&fit=crop",
    duration: "8:56",
    views: "324K",
    publishedAt: "3 weeks ago",
    url: "https://youtube.com",
  },
  {
    id: "6",
    title: "E-Waste Recycling - What Happens to Your Old Electronics",
    channel: "Tech Sustainability",
    thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=640&h=360&fit=crop",
    duration: "15:33",
    views: "678K",
    publishedAt: "1 month ago",
    url: "https://youtube.com",
  },
];

export const VideoList = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Recent Environmental Videos</h2>
        <p className="text-muted-foreground">
          Stay informed with the latest videos about sustainability and eco-friendly practices
        </p>
      </div>

      {/* Featured Video */}
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
        <div className="relative aspect-video">
          <img
            src={recentVideos[0].thumbnail}
            alt={recentVideos[0].title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-glow animate-pulse-slow">
              <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
            <span className="bg-primary px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
              Featured
            </span>
            <h3 className="text-2xl font-bold mb-2">{recentVideos[0].title}</h3>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
              <span>{recentVideos[0].channel}</span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> {recentVideos[0].views}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {recentVideos[0].duration}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentVideos.slice(1).map((video) => (
          <Card key={video.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-foreground/80 text-primary-foreground text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{video.channel}</span>
                <span>{video.views} views</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{video.publishedAt}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Load More Videos <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
