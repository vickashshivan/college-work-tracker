import { Card } from "@/components/ui/card";
import { Building2, ClipboardCheck, Users, DollarSign } from "lucide-react";

const stats = [
  {
    title: "Active Colleges",
    value: "12",
    change: "+2 this month",
    icon: Building2,
    color: "text-primary"
  },
  {
    title: "Total Tasks",
    value: "234",
    change: "+18 today",
    icon: ClipboardCheck,
    color: "text-success"
  },
  {
    title: "Active Employees",
    value: "45",
    change: "3 on leave",
    icon: Users,
    color: "text-warning"
  },
  {
    title: "Monthly Cost",
    value: "₹2,45,680",
    change: "+₹15,240 this week",
    icon: DollarSign,
    color: "text-primary"
  }
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-business-md transition-smooth">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.change}</p>
            </div>
            <div className={`p-3 rounded-lg bg-accent/10 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};