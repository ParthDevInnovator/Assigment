import React, { useEffect, useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { ClipboardList } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const API_URL = 'http://localhost:3001  ';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string, description: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error('Failed to add task');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskStatus = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}/status`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to update task status');
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  const editTask = async (id: number, newTitle: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!response.ok) throw new Error('Failed to edit task');
      fetchTasks();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <ClipboardList className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>
        
        <TaskForm onSubmit={addTask} />
        
        {tasks.length === 0 ? (
          <div className="mt-8 text-center text-gray-500">
            No tasks yet. Add your first task above!
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleStatus={toggleTaskStatus}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;