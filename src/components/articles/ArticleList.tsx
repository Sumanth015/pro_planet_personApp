import { ArrowRight, Calendar, Tag, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

const recentArticles: Article[] = [
  {
    id: "1",
    title: "How Bengaluru's Lakes Are Making a Comeback",
    excerpt: "Community efforts and innovative technologies are helping restore Bengaluru's once-polluted lakes to their former glory. Learn about the success stories and ongoing challenges.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    category: "Bengaluru Focus",
    author: "Priya Sharma",
    date: "Nov 20, 2025",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "10 Steps to Start Your Zero Waste Journey",
    excerpt: "Begin your zero waste lifestyle with these practical, easy-to-implement steps. From kitchen organization to shopping habits, transform your daily routine.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop",
    category: "Eco Tips",
    author: "Rahul Verma",
    date: "Nov 18, 2025",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "The Solar Revolution in Urban India",
    excerpt: "How innovative solar technologies are transforming India's urban landscapes and providing sustainable energy solutions.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop",
    category: "Innovation",
    author: "Amit Patel",
    date: "Nov 15, 2025",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Water Conservation Techniques for Indian Homes",
    excerpt: "Simple but effective ways to reduce water usage in your home, helping address water scarcity issues in urban areas.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=400&fit=crop",
    category: "Eco Tips",
    author: "Sneha Desai",
    date: "Nov 12, 2025",
    readTime: "4 min read",
  },
  {
    id: "5",
    title: "Understanding E-Waste: A Growing Environmental Concern",
    excerpt: "Electronic waste is one of the fastest-growing waste streams globally. Learn what it is, why it's dangerous, and how to properly dispose of it.",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&h=400&fit=crop",
    category: "Environment News",
    author: "Vikram Singh",
    date: "Nov 10, 2025",
    readTime: "8 min read",
  },
  {
    id: "6",
    title: "Community Gardens: Bringing Green Spaces to Urban Areas",
    excerpt: "Discover how community gardens are transforming empty lots into thriving green spaces and building stronger neighborhoods.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
    category: "Community",
    author: "Meera Nair",
    date: "Nov 8, 2025",
    readTime: "5 min read",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Bengaluru Focus":
      return "bg-primary/10 text-primary";
    case "Eco Tips":
      return "bg-blue-100 text-blue-700";
    case "Innovation":
      return "bg-purple-100 text-purple-700";
    case "Environment News":
      return "bg-orange-100 text-orange-700";
    case "Community":
      return "bg-green-100 text-green-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const ArticleList = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Recent Environmental Articles</h2>
        <p className="text-muted-foreground">
          Stay informed with curated articles about sustainability and green practices
        </p>
      </div>

      {/* Featured Article */}
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-video md:aspect-auto">
            <img
              src={recentArticles[0].image}
              alt={recentArticles[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <CardContent className="p-6 md:p-8 flex flex-col justify-center">
            <Badge className={`w-fit mb-4 ${getCategoryColor(recentArticles[0].category)}`}>
              {recentArticles[0].category}
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {recentArticles[0].title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {recentArticles[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {recentArticles[0].author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {recentArticles[0].date}
              </span>
              <span>{recentArticles[0].readTime}</span>
            </div>
            <Button className="w-fit gradient-primary text-primary-foreground">
              Read Article <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </div>
      </Card>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentArticles.slice(1).map((article) => (
          <Card key={article.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
            <div className="relative aspect-video">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {article.author}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                <span>{article.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Load More Articles <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Newsletter */}
      <Card className="gradient-primary text-primary-foreground p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-primary-foreground/80">
              Get the latest environmental news, tips, and events delivered to your inbox.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-lg text-foreground bg-card flex-1 md:w-64"
            />
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-light hover:text-primary-foreground">
              Subscribe
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
