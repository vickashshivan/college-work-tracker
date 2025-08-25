import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface WorkEntry {
  id: string;
  college_id: string;
  location: string;
  work_description: string;
  work_type: string;
  length: number | null;
  width: number | null;
  height: number | null;
  square_feet: number | null;
  rate_per_sqft: number | null;
  final_rate: number | null;
  status: "pending" | "in-progress" | "completed";
  date: string;
  created_at: string;
  updated_at: string;
  colleges?: {
    id: string;
    name: string;
    location: string | null;
  };
}

export interface CreateWorkEntryData {
  college_id: string;
  location: string;
  work_description: string;
  work_type: string;
  length?: number;
  width?: number;
  height?: number;
  square_feet?: number;
  rate_per_sqft?: number;
  final_rate?: number;
  status?: "pending" | "in-progress" | "completed";
  date?: string;
}

export const useWorkEntries = () => {
  return useQuery({
    queryKey: ["work-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_entries")
        .select(`
          *,
          colleges:college_id (
            id,
            name,
            location
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as WorkEntry[];
    },
  });
};

export const useCreateWorkEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateWorkEntryData) => {
      const { data: result, error } = await supabase
        .from("work_entries")
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-entries"] });
      toast({
        title: "Success",
        description: "Work entry created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create work entry: " + error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateWorkEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateWorkEntryData> }) => {
      const { data: result, error } = await supabase
        .from("work_entries")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-entries"] });
      toast({
        title: "Success",
        description: "Work entry updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update work entry: " + error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteWorkEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("work_entries")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-entries"] });
      toast({
        title: "Success",
        description: "Work entry deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete work entry: " + error.message,
        variant: "destructive",
      });
    },
  });
};