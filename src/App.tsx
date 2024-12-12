import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Zap, Plus } from 'lucide-react';
import { TaskTable } from '@/components/TaskTable';
import { RecommendationList } from '@/components/RecommendationList';
import { initialTasks, initialRecommendations } from '@/data/initial-data';
import { generateNewRecommendations } from '@/utils/recommendations';
import { TaskEntry, Recommendation } from '@/types/productivity';
import { TaskForm } from '@/components/TaskInput/TaskForm';
import { TaskFormData } from '@/types/forms';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function App() {
  const [tasks, setTasks] = useState<TaskEntry[]>(initialTasks);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = (formData: TaskFormData) => {
    const newTask: TaskEntry = {
      id: Date.now(),
      ...formData,
      completionOrder: tasks.length + 1,
      method: 'Manual Entry',
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsAddingTask(false);
  };

  const handleEditTask = (id: number, formData: TaskFormData) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id 
        ? { ...task, ...formData }
        : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleRegenerateRecommendations = () => {
    setRecommendations(generateNewRecommendations());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center">
            <Zap className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> 
            Productivity Optimization AI
          </h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <TaskForm 
                onSubmit={handleAddTask}
                isLoading={isAddingTask}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Clock className="mr-2 h-5 w-5" /> Task Log
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <TaskTable 
                tasks={tasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="mr-2 h-5 w-5" /> AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <RecommendationList recommendations={recommendations} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Button 
            onClick={handleRegenerateRecommendations} 
            className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
          >
            Regenerate AI Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;