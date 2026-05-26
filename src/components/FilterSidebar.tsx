import type {FilterType } from "../types/taskProps";

interface FilterSidebarProps {
    isOpenMenu: boolean
    setIsOpenMenu: (isOpenMenu: boolean) => void
    filter: FilterType
    setFilter: (filter: FilterType) => void
}


export const FilterSidebar = ({ isOpenMenu, setIsOpenMenu, filter, setFilter }: FilterSidebarProps) => {
    if (!isOpenMenu) return null

    return (
        <>
            <div
                onClick={() => setIsOpenMenu(false)}
                className='fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-45 animate-in fade-in duration-200'
            />
            <aside className='fixed top-0 right-0 h-full w-[85%] bg-slate-800 p-6 shadow-2xl border-l border-slate-700 z-50 animate-in slide-in-from-right duration-200'>

                <div className='flex justify-end  pt-4 pb-8'>

                    <button onClick={() => setIsOpenMenu(false)} className='uppercase text-slate-950 bg-slate-200 w-6 rounded-xs cursor-pointer hover:bg-slate-400 transition-colors'>x</button>
                </div>



                <nav className='flex flex-col justify-center'>

                    <h2 className='self-center mb-5 uppercase text-3xl font-semibold'>Filtro</h2>

                    <ul className='text-xl font-semibold flex flex-col gap-4'>
                        <li>
                            <button
                                onClick={() => { setFilter('DONE'); setIsOpenMenu(false) }}
                                className={`uppercase w-full flex flex-col items-center text-green-400
                              px-4 py-3 rounded-sm
                             cursor-pointer transition-colors ${filter === 'DONE'
                                        ? 'bg-green-400/20 border border-green-400'
                                        : 'bg-green-400/10 border border-green-400/20 hover:bg-green-400/20'
                                    }`}>Concluídas</button>
                        </li>
                        <li>
                            <button onClick={() => { setFilter('PENDING'); setIsOpenMenu(false) }}
                                className={`uppercase w-full flex flex-col items-center px-4 py-3 rounded-sm cursor-pointer transition-colors ${filter === 'PENDING'
                                    ? 'text-yellow-400 bg-yellow-400/20 border border-yellow-400'
                                    : 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 hover:bg-yellow-400/20'
                                    }`}
                            >Pendentes</button>
                        </li>
                        <li>
                            <button onClick={() => { setFilter('HIGH'); setIsOpenMenu(false) }}
                                className={`uppercase w-full flex flex-col items-center px-4 py-3 rounded-sm cursor-pointer transition-colors ${filter === 'HIGH'
                                    ? 'text-red-400 bg-red-400/20 border border-red-400'
                                    : 'text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20'
                                    }`}>Alta Prioridade</button>
                        </li>
                        <li>
                            <button onClick={() => { setFilter('ALL'); setIsOpenMenu(false) }}
                                className={`uppercase w-full flex flex-col items-center px-4 py-3 rounded-sm cursor-pointer transition-colors ${filter === 'ALL'
                                    ? 'text-slate-400 bg-slate-400/20 border border-slate-400'
                                    : 'text-slate-400 bg-slate-400/10 border border-slate-400/20 hover:bg-slate-400/20'
                                    }`}>Todas</button>
                        </li>
                    </ul>
                </nav>

            </aside>
        </>
    )
}

