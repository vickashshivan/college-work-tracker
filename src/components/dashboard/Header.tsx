import { Building2, Users, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-business-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">College Work Management</h1>
              <p className="text-primary-foreground/80 text-sm">Multi-College Task & Cost Management System</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
              <Users className="h-4 w-4 mr-2" />
              Employees
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};