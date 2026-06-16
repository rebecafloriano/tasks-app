import { useState, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import { Menu } from 'lucide-react';
import { TaskCard } from './components/TaskCard';
import { AddTaskModal } from './components/AddTaskModal';
import { FilterSidebar } from './components/FilterSidebar';
import { type FilterType } from './types/taskProps';
import { Toaster } from 'sonner';


export default function App() {
  const { tasks } = useTasks(); // Puxa apenas a lista global sincronizada

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterType>('ALL');

  const countDone = tasks.filter(item => item.progress === 100).length;

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'DONE') return task.progress === 100;
      if (filter === 'PENDING') return task.progress < 100;
      if (filter === 'HIGH') return task.priority === 'HIGH';
      return true;
    });
  }, [tasks, filter]);

  return (
    <div className="flex flex-col bg-slate-900 text-slate-100 font-sans min-h-dvh w-full">
      <Toaster position="top-center" richColors />

      <header className="lg:py-4 sticky top-0 z-40 backdrop-blur-md bg-slate-950/80">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center p-6">
          <span className='lg:text-4xl text-2xl font-bold tracking-tight bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent'>TaskFlow</span>

          <nav className='hidden lg:flex'>
            <ul className='text-sm font-semibold flex gap-5'>
              {(['DONE', 'PENDING', 'HIGH', 'ALL'] as FilterType[]).map((type) => (
                <li key={type}>
                  <button
                    onClick={() => setFilter(type)}
                    className={`uppercase rounded-md px-4 py-1 cursor-pointer transition-colors ${filter === type ? 'bg-slate-700/50 border border-slate-500' : 'opacity-70 hover:opacity-100'}`}
                  >
                    {type === 'DONE' && 'Concluídas'}
                    {type === 'PENDING' && 'Pendentes'}
                    {type === 'HIGH' && 'Alta Prioridade'}
                    {type === 'ALL' && 'Todas'}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button onClick={() => setIsOpenMenu(true)} className='lg:hidden bg-slate-900 p-2 rounded-lg border border-slate-700 cursor-pointer group'>
            <Menu size={22} color="gray" />
          </button>
        </div>
      </header>

      <FilterSidebar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} filter={filter} setFilter={setFilter} />

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
                  {filter === 'ALL' ? 'Uau! Estás livre por hoje. Que tal criar uma nova tarefa?' : `Não tens nenhuma tarefa no filtro.`}
                </p>
              </div>
            )}
          </section>

          <AddTaskModal isOpen={isOpenModalAdd} onClose={() => setIsOpenModalAdd(false)} />
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