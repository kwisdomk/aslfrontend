import { Task } from "../types";
import ProtocolCard from "./ProtocolCard";
import DashboardHeader from "./DashboardHeader";
import { useEffect, useState } from "react";
import { supabase } from '../src/lib/supabaseClient';

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('velocity_weight', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProgressUpdate = async (id: string, progress: number) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ progress, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, progress } : task
      ));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // Calculate global metrics
  const globalProgress = tasks.length > 0
    ? Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length)
    : 0;

  const velocity = tasks.length > 0
    ? tasks.reduce((sum, task) => sum + (task.velocity_weight || 1), 0) / tasks.length
    : 1.0;

  const totalHours = tasks.reduce((sum, task) => sum + task.estimated_hours, 0);
  
  const primaryTask = tasks.find(t => t.velocity_weight && t.velocity_weight > 1.3);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 font-bold">Loading Athena...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-12">
      <DashboardHeader 
        globalProgress={globalProgress}
        velocity={velocity}
        primaryFocus={primaryTask?.title}
        totalHours={totalHours}
      />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Protocols</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.map((task, index) => (
            <ProtocolCard 
              key={task.id} 
              task={task} 
              onProgressUpdate={handleProgressUpdate}
              priorityIndex={index + 1}
            />
          ))}
        </div>
      </div>

      {tasks.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-slate-400">No active protocols. Run the SQL seed to populate your tasks.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;