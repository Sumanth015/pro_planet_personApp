import { ArrowRight, Users, CheckCircle, Recycle, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Recycle className="w-4 h-4" />
              Join the Green Movement
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Be a <span className="text-primary">Pro Planet</span> Person
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Join our community of environmental champions working together to create a sustainable future. Complete eco-tasks, find recycling centers, and make a real impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/tasks">
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-lg transition-all">
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/map">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Find Recycle Hubs
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-float">
                <TreePine className="w-40 h-40 text-primary-foreground" />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-bold text-foreground">5,280+</p>
                    <p className="text-xs text-muted-foreground">Active Members</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-bold text-foreground">12,450+</p>
                    <p className="text-xs text-muted-foreground">Tasks Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 gradient-primary rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-8">
            Our Environmental Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "5,280+", label: "Active Members" },
              { value: "12,450+", label: "Tasks Completed" },
              { value: "345+", label: "Tons Waste Recycled" },
              { value: "85+", label: "Partner Organizations" },
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                <p className="text-3xl md:text-4xl font-bold text-primary-light mb-2">{stat.value}</p>
                <p className="text-sm text-primary-foreground/80 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
