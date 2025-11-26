import { Users, Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "GANAVI S PRASAD",
    role: "Project Lead & Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bio: "Passionate about sustainable technology and environmental conservation.",
  },
  {
    name: "SUMANTH K",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Building scalable solutions for a greener planet.",
  },
  {
    name: "SOANGOUD S BIRADAR",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    bio: "Creating intuitive experiences that inspire eco-friendly actions.",
  },
];

export const TeamMembers = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Our Team</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Meet The <span className="text-primary">Team</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Dedicated individuals working together to make environmental action accessible to everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <Card
            key={member.name}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-6 text-center">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-4 border-primary/20 group-hover:border-primary transition-colors"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
              <div className="flex justify-center gap-3">
                <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
