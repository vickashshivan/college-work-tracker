import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Calculator, Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WorkEntryForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    collegeName: "",
    block: "",
    floor: "",
    place: "",
    particular: "",
    workType: "",
    length: "",
    breadth: "",
    count: "",
    ratePerSqFt: "",
    date: "",
    taskType: "New Task"
  });

  const [calculatedValues, setCalculatedValues] = useState({
    sqFeet: 0,
    finalRate: 0
  });

  const calculateValues = () => {
    const sqFeet = parseFloat(formData.length) * parseFloat(formData.breadth) || 0;
    const finalRate = sqFeet * parseFloat(formData.count || "1") * parseFloat(formData.ratePerSqFt || "0");
    
    setCalculatedValues({ sqFeet, finalRate });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate when relevant fields change
    if (['length', 'breadth', 'count', 'ratePerSqFt'].includes(field)) {
      setTimeout(calculateValues, 100);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Work Entry Saved",
      description: `Task for ${formData.collegeName} has been recorded successfully.`
    });
  };

  return (
    <Card className="p-6 bg-gradient-card border-0 shadow-card">
      <div className="flex items-center space-x-2 mb-6">
        <Plus className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">New Work Entry</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* College & Location */}
        <div className="space-y-2">
          <Label htmlFor="college">College Name</Label>
          <Select value={formData.collegeName} onValueChange={(value) => handleInputChange('collegeName', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abc-engineering">ABC Engineering College</SelectItem>
              <SelectItem value="xyz-arts">XYZ Arts College</SelectItem>
              <SelectItem value="tech-university">Tech University</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="block">Block</Label>
          <Input
            id="block"
            placeholder="e.g., Block A"
            value={formData.block}
            onChange={(e) => handleInputChange('block', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="floor">Floor</Label>
          <Input
            id="floor"
            placeholder="e.g., Ground Floor"
            value={formData.floor}
            onChange={(e) => handleInputChange('floor', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="place">Place/Room</Label>
          <Input
            id="place"
            placeholder="e.g., Classroom 101"
            value={formData.place}
            onChange={(e) => handleInputChange('place', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workType">Work Type</Label>
          <Select value={formData.workType} onValueChange={(value) => handleInputChange('workType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Work Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="renovation">Renovation</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="new-work">New Work</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </div>

        {/* Work Description */}
        <div className="md:col-span-2 lg:col-span-3 space-y-2">
          <Label htmlFor="particular">Work Description</Label>
          <Textarea
            id="particular"
            placeholder="Describe the work to be done..."
            value={formData.particular}
            onChange={(e) => handleInputChange('particular', e.target.value)}
          />
        </div>

        {/* Measurements & Calculations */}
        <div className="space-y-2">
          <Label htmlFor="length">Length (ft)</Label>
          <Input
            id="length"
            type="number"
            placeholder="0.0"
            value={formData.length}
            onChange={(e) => handleInputChange('length', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="breadth">Breadth (ft)</Label>
          <Input
            id="breadth"
            type="number"
            placeholder="0.0"
            value={formData.breadth}
            onChange={(e) => handleInputChange('breadth', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sqFeet">Square Feet (Auto)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="sqFeet"
              value={calculatedValues.sqFeet.toFixed(2)}
              disabled
              className="bg-accent/50"
            />
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="count">Count/Units</Label>
          <Input
            id="count"
            type="number"
            placeholder="1"
            value={formData.count}
            onChange={(e) => handleInputChange('count', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ratePerSqFt">Rate per Sq. Ft (₹)</Label>
          <Input
            id="ratePerSqFt"
            type="number"
            placeholder="0.00"
            value={formData.ratePerSqFt}
            onChange={(e) => handleInputChange('ratePerSqFt', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="finalRate">Final Rate (Auto)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="finalRate"
              value={`₹${calculatedValues.finalRate.toFixed(2)}`}
              disabled
              className="bg-success/10 font-semibold"
            />
            <Calculator className="h-4 w-4 text-success" />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit} className="bg-gradient-primary hover:bg-primary-hover">
          <Save className="h-4 w-4 mr-2" />
          Save Work Entry
        </Button>
      </div>
    </Card>
  );
};