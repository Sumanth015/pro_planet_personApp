import { useState } from "react";
import { Plus, Check, Recycle, Lightbulb, Droplets, Users, Book, TreePine, Coins, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CoinRedemption } from "@/components/redemption/CoinRedemption";
import { useAuth } from "@/contexts/AuthContext";

export interface Task {
  id: string;
  title: string;
  category: "recycling" | "energy" | "water" | "community" | "education" | "planting";
  coins: number;
  impact: string;
  completed: boolean;
  isUserCreated?: boolean;
}

const categoryConfig = {
  recycling: { icon: Recycle, color: "text-primary", bg: "bg-primary/10" },
  energy: { icon: Lightbulb, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  water: { icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  community: { icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  education: { icon: Book, color: "text-orange-500", bg: "bg-orange-500/10" },
  planting: { icon: TreePine, color: "text-green-600", bg: "bg-green-600/10" },
};

const defaultTasks: Task[] = [
  { id: "1", title: "Recycle 1kg of plastic", category: "recycling", coins: 50, impact: "Prevents plastic pollution and reduces landfill waste", completed: false },
  { id: "2", title: "Switch to LED bulbs", category: "energy", coins: 30, impact: "Reduces energy consumption and lowers carbon emissions", completed: false },
  { id: "3", title: "Install water-saving fixtures", category: "water", coins: 40, impact: "Conserves water, crucial for water security", completed: false },
  { id: "4", title: "Participate in cleanup drive", category: "community", coins: 100, impact: "Improves local environments and builds community spirit", completed: false },
  { id: "5", title: "Complete eco-education module", category: "education", coins: 25, impact: "Spreads awareness and inspires others to act", completed: false },
  { id: "6", title: "Plant a tree", category: "planting", coins: 75, impact: "Absorbs CO2 and improves air quality", completed: false },
  { id: "7", title: "Use public transport for a week", category: "energy", coins: 60, impact: "Reduces carbon footprint from personal vehicles", completed: false },
  { id: "8", title: "Start composting at home", category: "recycling", coins: 80, impact: "Reduces organic waste going to landfills", completed: false },
];

interface TaskListProps {
  onTaskComplete: (task: Task) => void;
}

export const TaskList = ({ onTaskComplete }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [filter, setFilter] = useState<string>("all");
  const [ecoCoins, setEcoCoins] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    category: "recycling" as Task["category"],
    impact: "",
  });
  const { isAuthenticated, updateCoins } = useAuth();

  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.category === filter
  );

  const handleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && !task.completed) {
          setEcoCoins((c) => c + task.coins);
          if (isAuthenticated) {
            updateCoins(task.coins);
          }
          onTaskComplete(task);
          toast.success(`Task completed! You earned ${task.coins} eco-coins 🌱`);
          return { ...task, completed: true };
        }
        return task;
      })
    );
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    // Validate it's environment-related
    const ecoKeywords = ["recycle", "plant", "compost", "clean", "save", "reduce", "reuse", "green", "eco", "water", "energy", "waste", "tree", "nature", "environment", "pollution", "sustainable", "organic", "plastic"];
    const isEcoRelated = ecoKeywords.some(keyword => 
      newTask.title.toLowerCase().includes(keyword) || 
      newTask.impact.toLowerCase().includes(keyword)
    );

    if (!isEcoRelated) {
      toast.error("Tasks must be related to environmental actions! Try including words like recycle, plant, clean, save, etc.");
      return;
    }

    const task: Task = {
      id: `user-${Date.now()}`,
      title: newTask.title,
      category: newTask.category,
      coins: 50,
      impact: newTask.impact || "Personal contribution to a greener planet",
      completed: false,
      isUserCreated: true,
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask({ title: "", category: "recycling", impact: "" });
    setIsDialogOpen(false);
    toast.success("Eco task added! Complete it to earn coins 🌿");
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    toast.info("Task removed");
  };

  const handleRedeem = (amount: number) => {
    setEcoCoins((prev) => prev - amount);
    if (isAuthenticated) {
      updateCoins(-amount);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with coins */}
      <Card className="gradient-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Complete Tasks, Earn Rewards</h3>
              <p className="text-primary-foreground/80">
                Each completed task earns you eco-coins. 100 coins = ₹1 in value!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 bg-primary-dark/50 px-6 py-3 rounded-full">
                <Coins className="w-8 h-8 text-eco-coin" />
                <div>
                  <p className="text-sm text-primary-foreground/80">Your Eco-Coins</p>
                  <p className="text-2xl font-bold">{ecoCoins}</p>
                </div>
              </div>
              <CoinRedemption ecoCoins={ecoCoins} onRedeem={handleRedeem} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Add Button */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["all", "recycling", "energy", "water", "community", "education", "planting"].map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
              className={cn(
                "capitalize",
                filter === cat && "gradient-primary text-primary-foreground"
              )}
            >
              {cat === "all" ? "All Tasks" : cat}
            </Button>
          ))}
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" /> Add Eco Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Your Eco Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Recycle newspapers weekly"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be an environmental action (recycle, plant, clean, save energy, etc.)
                </p>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value: Task["category"]) =>
                    setNewTask({ ...newTask, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recycling">Recycling</SelectItem>
                    <SelectItem value="energy">Energy Saving</SelectItem>
                    <SelectItem value="water">Water Conservation</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="planting">Planting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="impact">Environmental Impact</Label>
                <Textarea
                  id="impact"
                  placeholder="Describe the positive environmental impact..."
                  value={newTask.impact}
                  onChange={(e) => setNewTask({ ...newTask, impact: e.target.value })}
                />
              </div>
              <Button onClick={handleAddTask} className="w-full gradient-primary text-primary-foreground">
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader className="bg-accent text-accent-foreground">
          <div className="flex items-center text-sm font-semibold">
            <div className="w-6/12 md:w-4/12">Task</div>
            <div className="w-2/12 text-center">Coins</div>
            <div className="hidden md:block w-4/12">Impact</div>
            <div className="w-4/12 md:w-2/12 text-right">Action</div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No tasks found in this category
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredTasks.map((task) => {
                const config = categoryConfig[task.category];
                const Icon = config.icon;
                return (
                  <div
                    key={task.id}
                    className={cn(
                      "task-item p-4 flex items-center",
                      task.completed && "completed opacity-60"
                    )}
                  >
                    <div className="w-6/12 md:w-4/12 flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", config.bg)}>
                        <Icon className={cn("w-4 h-4", config.color)} />
                      </div>
                      <div>
                        <span className={cn(task.completed && "line-through")}>{task.title}</span>
                        {task.isUserCreated && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Custom
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-2/12 text-center">
                      <span className="bg-eco-coin/20 text-eco-coin font-semibold px-3 py-1 rounded-full text-sm">
                        {task.coins}
                      </span>
                    </div>
                    <div className="hidden md:block w-4/12 text-sm text-muted-foreground">
                      {task.impact}
                    </div>
                    <div className="w-4/12 md:w-2/12 flex justify-end gap-2">
                      {task.completed ? (
                        <span className="flex items-center text-primary text-sm">
                          <Check className="w-4 h-4 mr-1" /> Done
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleComplete(task.id)}
                          className="gradient-primary text-primary-foreground"
                        >
                          Complete
                        </Button>
                      )}
                      {task.isUserCreated && !task.completed && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
