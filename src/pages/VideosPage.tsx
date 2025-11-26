import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NotificationPanel, Notification } from "@/components/notifications/NotificationPanel";
import { VideoList } from "@/components/videos/VideoList";

const VideosPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "tip",
      title: "New Video Alert",
      message: "Check out our latest documentary on plastic pollution in India's oceans!",
      time: "1 hour ago",
      read: false,
    },
  ]);

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
        <VideoList />
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

export default VideosPage;
