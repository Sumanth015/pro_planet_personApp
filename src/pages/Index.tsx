import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NotificationPanel, Notification } from "@/components/notifications/NotificationPanel";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "tip",
    title: "Eco Tip of the Day",
    message: "Unplug electronics when not in use to save energy and reduce your carbon footprint!",
    time: "Just now",
    read: false,
  },
  {
    id: "2",
    type: "location",
    title: "New Recycling Center Nearby",
    message: "A new e-waste collection point has opened in Koramangala. Check the map for details!",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "achievement",
    title: "Achievement Unlocked! 🏆",
    message: "You've completed 5 recycling tasks this week. You're a Recycling Champion!",
    time: "Yesterday",
    read: true,
  },
];

const Index = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        notificationCount={notifications.filter((n) => !n.read).length}
        onNotificationClick={() => setShowNotifications(true)}
      />

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>

      <Footer />

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onClearAll={handleClearAll}
      />
    </div>
  );
};

export default Index;
