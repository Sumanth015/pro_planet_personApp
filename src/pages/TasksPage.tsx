import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NotificationPanel, Notification } from "@/components/notifications/NotificationPanel";
import { TaskList, Task } from "@/components/tasks/TaskList";

const TasksPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "tip",
      title: "Daily Eco Challenge",
      message: "Try completing at least one recycling task today to earn bonus eco-coins!",
      time: "Just now",
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

  const handleTaskComplete = (task: Task) => {
    const newNotification: Notification = {
      id: `task-${Date.now()}`,
      type: "achievement",
      title: "Task Completed! 🎉",
      message: `You completed "${task.title}" and earned ${task.coins} eco-coins!`,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
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
            Environmental Tasks
          </h1>
          <p className="text-muted-foreground">
            Complete eco-tasks to earn rewards and make a positive impact on the planet
          </p>
        </div>

        <TaskList onTaskComplete={handleTaskComplete} />
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

export default TasksPage;
