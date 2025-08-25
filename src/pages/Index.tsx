import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { WorkEntryForm } from "@/components/work-entry/WorkEntryForm";
import { RecentWorkTable } from "@/components/work-entry/RecentWorkTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Manage work entries, track costs, and monitor employee attendance across all colleges.</p>
        </div>

        <StatsCards />
        
        <div className="space-y-8">
          <WorkEntryForm />
          <RecentWorkTable />
        </div>
      </main>
    </div>
  );
};

export default Index;
