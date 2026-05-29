import { useTasks } from "../context/TaskContext";
import { Plus, Minus, Trash2 } from 'lucide-react'
import { formatDate } from "../utils/formatDate";
import { type Task } from "../types/taskProps";

interface TaskCardProps {
    task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
    const { plusProgress, minusProgress, deleteTask } = useTasks()

    const progressValue = task.progress ?? 0;

    const isExpired = task.date
        ? new Date(`${task.date.substring(0, 10)}T23:59:59`).getTime() < Date.now()
        : false;

    const getPriorityStyles = (priority: 'HIGH' | 'MEDIUM' | 'LOW') => {
        switch (priority) {
            case 'HIGH':
                return 'text-red-400 bg-red-400/10 border-red-400'
            case 'MEDIUM':
                return 'text-amber-400 bg-yellow-400/10 border-amber-400'
            case 'LOW':
                return 'text-green-400 bg-green-400/10 border-green-400'
            default:
                return 'text-slate-600 bg-slate-400/10 border-slate-200'
        }
    }

    return (
        <div className="relative border border-slate-800 bg-slate-950 p-5 rounded-xl hover:border-slate-700 hover:bg-slate-800/80 transition-all duration-200 flex flex-col justify-between min-h-55]">

            <div>

                <div className="flex flex-wrap gap-2 items-center pr-8 mb-3">
                    <span className="rounded-md border border-slate-800 py-1 px-2 bg-slate-900 font-semibold text-slate-400 text-[11px]">
                        {task.category}
                    </span>
                    <span className={`rounded-md border py-1 px-2 font-bold text-[11px] uppercase ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                    </span>


                    <button
                        type="button"
                        className="absolute top-4 right-4 p-1.5 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                        onClick={() => deleteTask(task.id)}
                        title="Excluir tarefa"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>


                <h3 className="font-semibold text-base mb-4 text-slate-100 line-clamp-2 pr-4">
                    {task.title || "Tarefa Sem Título"}
                </h3>
            </div>

            <div className="mt-auto w-full">
                <div className="flex justify-between items-end mb-1 text-xs text-slate-500">
                    <div className="max-w-[75%]">
                        {/* Se a tarefa está em 100%, ela está perfeita. Só mostra a data normal em verde */}
                        {task.progress === 100 ? (
                            <span className="text-emerald-500 font-medium">
                                {task.date ? formatDate(task.date) : "Sem prazo"} (Concluído)
                            </span>
                        ) : isExpired ? (
                            /* Se não está em 100% e o prazo já passou, aí sim mostra o alerta vermelho */
                            <span className="text-red-400 font-medium animate-pulse">
                                {task.date ? formatDate(task.date) : "Sem prazo"} (Atrasada)
                            </span>
                        ) : (
                            /* Caso contrário, mostra a data cinzenta normal de uma tarefa que está dentro do prazo */
                            <span className="text-slate-500">
                                {task.date ? formatDate(task.date) : "Sem prazo"}
                            </span>
                        )}
                    </div>
                    <span className="font-bold text-slate-300">{task.progress}%</span>
                </div>

                <div className="w-full h-1.5 rounded-2xl bg-slate-800 mb-4 overflow-hidden">
                    <div
                        className={`${progressValue === 100 ? "bg-green-500" : "bg-blue-600"} h-1.5 rounded-2xl transition-all duration-300`}
                        style={{ width: `${progressValue}%` }}
                    />
                </div>

                {/* Botões de Ação Dinâmicos */}
                <div className="flex gap-2 items-center w-full">
                    <button
                        onClick={() => minusProgress(task.id)}
                        disabled={progressValue === 0}
                        className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500/30 disabled:opacity-40 disabled:hover:text-slate-400 disabled:hover:border-slate-800 transition-all text-xs font-semibold cursor-pointer"
                    >
                        <Minus size={13} />
                        <span>Progresso</span>
                    </button>
                    <button
                        onClick={() => plusProgress(task.id)}
                        disabled={progressValue === 100}
                        className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-500 hover:border-blue-500/30 disabled:opacity-40 disabled:hover:text-slate-400 disabled:hover:border-slate-800 transition-all text-xs font-semibold cursor-pointer"
                    >
                        <Plus size={13} />
                        <span>Progresso</span>
                    </button>
                </div>
            </div>

        </div>
    )
}