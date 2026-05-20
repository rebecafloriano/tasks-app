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
  const [isOpen, setIsOpen] = useState<boolean>(false)

  type FilterType = 'ALL' | 'DONE' | 'PENDING' | 'HIGH'
  const [filter, setFilter] = useState<FilterType>('ALL')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'DONE') return task.progress === 100
    if (filter === 'PENDING') return task.progress < 100
    if (filter === 'HIGH') return task.priority === 'HIGH'
    return true
  })

  return (
    <div className="flex flex-col bg-slate-900 text-slate-100 font-sans min-h-screen">

      <header className="bg-slate-950 flex justify-between p-6 border-b border-slate-800">
        <div>
          <span className='text-2xl font-bold tracking-tight bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent'>TaskFlow</span>
        </div>


        <button onClick={() => setIsOpen(true)} className='bg-slate-900 p-2 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-200 transition-colors'>
          <Menu
            size={22}
            color={"gray"}
          />
        </button>

      </header>
      {isOpen &&
        <aside className='fixed top-0 right-0 h-full w-80 bg-slate-800 p-6 shadow-2xl border-l border-slate-700 z-50 animate-in slide-in-from-right duration-200'>

          <div className='flex justify-end  pt-4 pb-8'>

            <button onClick={() => setIsOpen(false)} className='uppercase text-slate-950 bg-slate-200 w-6 rounded-xs cursor-pointer hover:bg-slate-400 transition-colors'>x</button>
          </div>



          <nav className='flex flex-col justify-center'>

            <h2 className='self-center mb-5 uppercase text-3xl font-semibold'>Filtro</h2>

            <ul className='text-xl font-semibold flex flex-col gap-4'>
              <li>
                <button onClick={() => { setFilter('DONE'); setIsOpen(false) }} className='uppercase w-full flex flex-col items-center text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-1 rounded-sm cursor-pointer hover:bg-green-400/20 transition-colors'>Concluídas</button>
              </li>
              <li>
                <button onClick={() => { setFilter('PENDING'); setIsOpen(false) }} className=' uppercase w-full flex flex-col items-center text-yellow-400  bg-yellow-400/10 border border-yellow-400/20 px-4 py-1 rounded-sm cursor-pointer hover:bg-yellow-400/20 transition-colors'>Pendentes</button>
              </li>
              <li>
                <button onClick={() => { setFilter('HIGH'); setIsOpen(false) }} className='uppercase w-full flex flex-col items-center text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-1 rounded-sm cursor-pointer hover:bg-red-400/20 transition-colors'>Alta Prioridade</button>
              </li>
              <li>
                <button onClick={() => { setFilter('ALL'); setIsOpen(false) }} className='uppercase w-full flex flex-col items-center text-slate-400 bg-slate-400/10 border border-slate-400/20 px-4 py-1 rounded-sm cursor-pointer hover:bg-slate-400/20 transition-colors'>Todas</button>
              </li>
            </ul>
          </nav>

        </aside>
      }


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
          {filteredTasks.map((item) => (

            <TaskCard
              key={item.id}
              task={item}
            />
          ))}
        </section>

      </main>

      <footer>
        <div className='items-center flex flex-col border-t border-slate-800 mx-5 text-sm text-slate-400 gap-1 p-6'>
          <span>Tasks: <strong className='text-slate-300'>{tasks.length} </strong>total | <strong className='text-green-500'>{countDone}</strong> done</span>
          <span className='font-extralight text-xs'>TaskFlow</span>
        </div>
      </footer>

    </div>
  );
}