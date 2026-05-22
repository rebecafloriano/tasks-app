import { Menu } from 'lucide-react'
import { TaskCard } from './components/TaskCard';
import { type Task, type FilterType } from './types/taskProps';
import { useState, useEffect } from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { AddTaskModal } from './components/AddTaskModal';


export default function App() {
  const [tasks, setTasks] = useState<Task[]>(()=> {
    const savedTasks = localStorage.getItem('@TaskFlow: tasks')
    
    if(savedTasks) {
      return JSON.parse(savedTasks)
    }
    return [
      { id: "1", title: "Fix Login Layout", category: "Frontend Task", priority: "MEDIUM", progress: 20, date: "2026-05-20" },
      { id: "2", title: "Setup PostgreSQL Database", category: "Backend Task", priority: "MEDIUM", progress: 100, date: "2026-05-22" },
      { id: "3", title: "Design New Dashboard", category: "UI/UX Task", priority: "LOW", progress: 15, date: "2026-05-25" },
      { id: "4", title: "Develop Dashboard Metrics", category: "UI/UX Task", priority: "HIGH", progress: 60, date: "2026-05-25" },
      { id: "5", title: "Refactor Auth Middleware", category: "Backend Task", priority: "HIGH", progress: 0, date: "2026-05-28" }

    ]
  })

  useEffect(() => {
    localStorage.setItem('@TaskFlow:tasks', JSON.stringify(tasks))
  }, [tasks])

  const countDone = tasks.filter(item => item.progress === 100).length
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)

  const [filter, setFilter] = useState<FilterType>('ALL')
  const filteredTasks = tasks.filter(task => {
    if (filter === 'DONE') return task.progress === 100
    if (filter === 'PENDING') return task.progress < 100
    if (filter === 'HIGH') return task.priority === 'HIGH'
    return true
  })


  const handleAddTask = (newTaskData: Omit<Task, "id" | "progress">) => {
    const finalTask: Task = {
      ...newTaskData,
      id: crypto.randomUUID(),
      progress: 0
    }
    setTasks((prevTasks) => [finalTask, ...prevTasks])
  }

  return (
    <div className="flex flex-col bg-slate-900 text-slate-100 font-sans min-h-dvh w-full">


      <header className="lg:py-4 sticky top-0 z-40 backdrop-blur-md bg-slate-950/80">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center p-6">

          <span className='lg:text-4xl text-2xl font-bold tracking-tight bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent'>TaskFlow</span>

          <nav className=' hidden lg:flex'>
            <ul className='text-sm font-semibold flex gap-5'>
              <li>
                <button
                  onClick={() => { setFilter('DONE'); setIsOpenMenu(false) }}
                  className={`uppercase  text-green-400
                               rounded-md px-4 py-1
                             cursor-pointer transition-colors ${filter === 'DONE'
                      ? 'bg-green-400/20 border border-green-400'
                      : 'bg-green-400/10 border border-green-400/20 hover:bg-green-400/20'
                    }`}>Concluídas</button>
              </li>
              <li>
                <button onClick={() => { setFilter('PENDING'); setIsOpenMenu(false) }}
                  className={`uppercase rounded-md px-4 py-1 cursor-pointer transition-colors ${filter === 'PENDING'
                    ? 'text-yellow-400 bg-yellow-400/20 border border-yellow-400'
                    : 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 hover:bg-yellow-400/20'
                    }`}
                >Pendentes</button>
              </li>
              <li>
                <button onClick={() => { setFilter('HIGH'); setIsOpenMenu(false) }}
                  className={`uppercase  rounded-md px-4 py-1 cursor-pointer transition-colors ${filter === 'HIGH'
                    ? 'text-red-400 bg-red-400/20 border border-red-400'
                    : 'text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20'
                    }`}>Alta Prioridade</button>
              </li>
              <li>
                <button onClick={() => { setFilter('ALL'); setIsOpenMenu(false) }}
                  className={`uppercase rounded-md px-4 py-1 cursor-pointer transition-colors ${filter === 'ALL'
                    ? 'text-slate-400 bg-slate-400/20 border border-slate-400'
                    : 'text-slate-400 bg-slate-400/10 border border-slate-400/20 hover:bg-slate-400/20'
                    }`}>Todas</button>
              </li>
            </ul>
          </nav>


          <button onClick={() => setIsOpenMenu(true)} className='lg:hidden bg-slate-900 p-2 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-200 transition-colors group'>
            <Menu size={22} color="gray" />
          </button>
        </div>
      </header>


      <FilterSidebar
        isOpenMenu={isOpenMenu}
        setIsOpenMenu={setIsOpenMenu}
        filter={filter}
        setFilter={setFilter}
      />

      <main className='w-full max-w-7xl mx-auto p-7 flex-1 flex flex-col justify-between pb-28'>

        <div>
          <div className='flex justify-between pb-7'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight uppercase'>Your Tasks</h1>
              <p className='text-sm text-slate-400'>Manage and track your sprint goals</p>
            </div>
          </div>

          <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full'>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((item) => (
                <TaskCard key={item.id} task={item} />
              ))
            ) : (
            
              <div className='col-span-full flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30 text-center'>
                <span className='text-4xl mb-3'>✨</span>
                <h3 className='text-lg font-semibold text-slate-200 uppercase tracking-wide'>Nenhuma tarefa encontrada</h3>
                <p className='text-sm text-slate-400 mt-1 max-w-xs'>
                  {filter === 'ALL'
                    ? 'Uau! Estás livre por hoje. Que tal criar uma nova tarefa?'
                    : `Não tens nenhuma tarefa no filtro de "${filter}".`}
                </p>
              </div>
            )}
          </section>

            <AddTaskModal
              isOpen={isOpenModalAdd}
              onClose={()=>setIsOpenModalAdd(false)}
              onAddTask={handleAddTask}
            />

          
        </div>


        <button onClick={() => setIsOpenModalAdd(true)} className='fixed bottom-22 right-4 md:bottom-24 xl:right-[calc((100vw-1280px)/2+24px)] bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-full md:w-16 md:h-16 w-14 h-14 items-center justify-center shadow-2xl flex cursor-pointer z-40 transition-all'>
          <span className='text-3xl md:text-4xl font-bold leading-none select-none -mt-0.5'>+</span>
        </button>

      </main>


      <footer className="w-full border-t border-slate-800 bg-slate-900">
        <div className='max-w-7xl mx-auto items-center flex flex-col text-sm text-slate-400 gap-1 p-6'>
          <span>Tasks: <strong className='text-slate-300'>{tasks.length} </strong>total | <strong className='text-green-500'>{countDone}</strong> done</span>
          <span className='font-extralight text-xs'>TaskFlow</span>
        </div>
      </footer>

    </div>
  );
}