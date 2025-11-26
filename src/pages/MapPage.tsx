import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NotificationPanel, Notification } from "@/components/notifications/NotificationPanel";
import { RecycleMap } from "@/components/map/RecycleMap";

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "location",
    title: "Nearby Recycling Center",
    message: "Saahas Zero Waste is 2km from your location. Open now!",
    time: "Just now",
    read: false,
  },
  {
    id: "2",
    type: "tip",
    title: "Recycling Tip",
    message: "Remember to clean and dry your recyclables before dropping them off!",
    time: "1 hour ago",
    read: false,
  },
];

const MapPage = () => {
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

      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Recycling Centers Map
          </h1>
          <p className="text-muted-foreground">
            Find recycling centers, e-waste collection points, and composting facilities near you
          </p>
        </div>

        <RecycleMap />

        {/* Info Box */}
        <div className="mt-8 gradient-primary text-primary-foreground p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Did You Know?</h3>
          <p className="mb-3 text-primary-foreground/90">
            Bengaluru generates approximately 5,000 metric tons of solid waste daily, with about 60% being organic waste that can be composted.
          </p>
          <p className="mb-3 text-primary-foreground/90">
            Proper waste segregation and recycling could reduce Bengaluru's landfill waste by up to 80%.
          </p>
          <p className="text-primary-foreground/90">
            By using the recycling centers mapped in our app, you're contributing to a significant reduction in the city's environmental footprint.
          </p>
        </div>
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

export default MapPage;
