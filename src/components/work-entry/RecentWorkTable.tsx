import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, Download } from "lucide-react";
import { useWorkEntries, useDeleteWorkEntry } from "@/hooks/useWorkEntries";
import { exportToExcel } from "@/utils/excelExport";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const RecentWorkTable = () => {
  const { data: workEntries = [], isLoading } = useWorkEntries();
  const deleteWorkEntry = useDeleteWorkEntry();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'in-progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'pending': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  const handleDelete = async (id: string) => {
    await deleteWorkEntry.mutateAsync(id);
  };

  const handleExport = () => {
    if (workEntries.length > 0) {
      exportToExcel(workEntries);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-card border-0 shadow-card">
        <div className="flex justify-center p-8">Loading work entries...</div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-card border-0 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Work Entries</h3>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" size="sm" disabled={workEntries.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {workEntries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No work entries found. Create your first work entry to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Work Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Sq.Ft</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Final Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workEntries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-accent/50">
                  <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{entry.colleges?.name || 'N/A'}</div>
                      {entry.colleges?.location && (
                        <div className="text-muted-foreground text-xs">{entry.colleges.location}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{entry.location}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {entry.work_description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {entry.work_type || 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      {entry.length && entry.width ? (
                        <>
                          <div>L: {entry.length}ft</div>
                          <div>W: {entry.width}ft</div>
                          {entry.height && <div>H: {entry.height}ft</div>}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{entry.square_feet ? `${entry.square_feet} ft²` : 'N/A'}</TableCell>
                  <TableCell>{entry.rate_per_sqft ? `₹${entry.rate_per_sqft}` : 'N/A'}</TableCell>
                  <TableCell className="font-semibold">
                    {entry.final_rate ? `₹${entry.final_rate.toLocaleString()}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status.replace('-', ' ')}
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Work Entry</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this work entry? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(entry.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
};