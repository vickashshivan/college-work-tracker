import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { WorkEntryForm } from "@/components/work-entry/WorkEntryForm";
import { RecentWorkTable } from "@/components/work-entry/RecentWorkTable";
import { CollegeManagement } from "@/components/colleges/CollegeManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        
        <Tabs defaultValue="work-entries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="work-entries">Work Entries</TabsTrigger>
            <TabsTrigger value="colleges">College Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="work-entries" className="space-y-8">
            <WorkEntryForm />
            <RecentWorkTable />
          </TabsContent>
          
          <TabsContent value="colleges">
            <CollegeManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
