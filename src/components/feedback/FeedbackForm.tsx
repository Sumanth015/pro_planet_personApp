import { useState } from "react";
import { MessageSquare, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"suggestion" | "bug" | "appreciation">("suggestion");

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    // Store feedback locally
    const feedbacks = JSON.parse(localStorage.getItem("proplanet_feedbacks") || "[]");
    feedbacks.push({
      id: Date.now(),
      rating,
      feedback,
      type: feedbackType,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("proplanet_feedbacks", JSON.stringify(feedbacks));

    toast.success("Thank you for your feedback! 🌱");
    setRating(0);
    setFeedback("");
    setFeedbackType("suggestion");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Share Your Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Feedback Type */}
        <div className="flex flex-wrap gap-2">
          {(["suggestion", "bug", "appreciation"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFeedbackType(type)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium capitalize transition-all",
                feedbackType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Star Rating */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Rate your experience</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "w-7 h-7 transition-colors",
                    (hoveredRating || rating) >= star
                      ? "fill-eco-coin text-eco-coin"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Text */}
        <Textarea
          placeholder="Tell us what you think..."
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <Button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground">
          Submit Feedback <Send className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
