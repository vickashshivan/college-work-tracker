import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";

const recentWork = [
  {
    id: "001",
    college: "ABC Engineering",
    block: "Block A",
    floor: "1st Floor",
    place: "Classroom 101",
    work: "Painting Walls",
    type: "Renovation",
    sqFeet: 506,
    rate: 30,
    finalRate: 15180,
    date: "2025-08-25",
    status: "completed"
  },
  {
    id: "002",
    college: "XYZ Arts College",
    block: "Block B",
    floor: "Ground Floor",
    place: "Library Hall",
    work: "Floor Cleaning",
    type: "Maintenance",
    sqFeet: 1200,
    rate: 15,
    finalRate: 18000,
    date: "2025-08-24",
    status: "in-progress"
  },
  {
    id: "003",
    college: "Tech University",
    block: "Block C",
    floor: "2nd Floor",
    place: "Computer Lab",
    work: "AC Installation",
    type: "New Work",
    sqFeet: 800,
    rate: 45,
    finalRate: 36000,
    date: "2025-08-23",
    status: "pending"
  }
];

export const RecentWorkTable = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'in-progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'pending': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-0 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Work Entries</h3>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Work</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sq.Ft</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Final Rate</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentWork.map((work) => (
              <TableRow key={work.id} className="hover:bg-accent/50">
                <TableCell className="font-medium">{work.id}</TableCell>
                <TableCell>{work.college}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{work.block}</div>
                    <div className="text-muted-foreground">{work.floor}, {work.place}</div>
                  </div>
                </TableCell>
                <TableCell>{work.work}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {work.type}
                  </Badge>
                </TableCell>
                <TableCell>{work.sqFeet} ft²</TableCell>
                <TableCell>₹{work.rate}</TableCell>
                <TableCell className="font-semibold">₹{work.finalRate.toLocaleString()}</TableCell>
                <TableCell>{work.date}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(work.status)}>
                    {work.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};