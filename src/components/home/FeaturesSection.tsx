import { CheckSquare, Map, Video, FileText, Bell, Recycle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CheckSquare,
    title: "Eco Tasks & Rewards",
    description: "Complete environmental tasks to earn eco-coins and contribute to a greener planet.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Map,
    title: "Recycling Map",
    description: "Find recycling centers and e-waste collection points near you with our interactive map.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Video,
    title: "Eco Videos",
    description: "Watch the latest environmental videos and documentaries from trusted sources.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: FileText,
    title: "Green Articles",
    description: "Stay informed with curated articles about sustainability and eco-friendly practices.",
    color: "text-primary-dark",
    bg: "bg-primary-dark/10",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get personalized reminders for eco-tasks, nearby events, and environmental tips.",
    color: "text-eco-coin",
    bg: "bg-eco-coin/10",
  },
  {
    icon: Recycle,
    title: "Community Recycling",
    description: "Connect with local recycling initiatives and community cleanup drives.",
    color: "text-primary-light",
    bg: "bg-primary-light/10",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact Platform Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make a positive environmental impact, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
