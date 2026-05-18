import { Menu } from 'lucide-react'
import { TaskCard } from './components/TaskCard';
import { type Task } from './types/cardProps';
import { useState } from 'react';

export default function App() {

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Fix Login Layout",
      category: "Frontend Task",
      priority: "MEDIUM",
      progress: 20,
      date: "May 20"
    },
    {
      id: "2",
      title: "Setup PostgreSQL Database",
      category: "Backend Task",
      priority: "MEDIUM",
      progress: 100,
      date: "May 22"
    },
    {
      id: "3",
      title: "Design New Dashboard Dashboard",
      category: "UI/UX Task",
      priority: "LOW",
      progress: 15,
      date: "May 25"
    },
    {
      id: "4",
      title: "Design New Dashboard Dashboard",
      category: "UI/UX Task",
      priority: "HIGH",
      progress: 60,
      date: "May 25"
    }

  ])
  const countDone = tasks.filter(item => item.progress === 100).length
 
  


  return (
    <div className="flex flex-col bg-slate-900 text-slate-100 font-sans min-h-screen">

      <header className="bg-slate-950 flex justify-between p-6 border-b border-slate-800">
        <div>
          <span className='text-2xl font-bold tracking-tight bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent'>TaskFlow</span>
        </div>


        <div className='bg-slate-900 p-2 rounded-lg border border-slate-700'>
          <Menu
            size={22}
            color={"gray"}
          />
        </div>
      </header>

      <main className='p-7 flex-1'>

        <div className='flex justify-between pb-7'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight uppercase'>Your Tasks</h1>
            <p className='text-sm text-slate-400'>Manage and track your sprint goals</p>
          </div>
          <div className='bg-blue-600 text-md rounded-lg self-center px-4 py-2'>
            <button>+ New Task</button>
          </div>
        </div>
        <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {tasks.map((item) => (
          
            <TaskCard
              key={item.id}
              task={item}
            />
          ))}
        </section>

      </main>

      <footer>
        <div className='items-center flex flex-col border-t border-slate-800 mx-5 text-sm text-slate-400 gap-1 p-6'>
          <span>Tasks: <strong className='text-slate-300'>{tasks.length} </strong>total | <strong className='text-green-500'>{ countDone}</strong> done</span>
          <span className='font-extralight text-xs'>TaskFlow</span>
        </div>
      </footer>

    </div>
  );
}