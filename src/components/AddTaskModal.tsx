import { useState } from "react"
import { type Task } from "../types/taskProps"
import { toast } from 'sonner'

interface AddTaskModalProps {
    isOpen: boolean
    onClose: () => void
    onAddTask: (task: Omit<Task, "id" | "progress">) => void
}

export const AddTaskModal = ({ isOpen, onClose, onAddTask }: AddTaskModalProps) => {

    const [title, setTitle] = useState<Task["title"]>("")
    const [category, setCategory] = useState<Task["category"]>("Frontend Task")
    const [priority, setPriority] = useState<Task["priority"]>("MEDIUM")
    const [date, setDate] = useState<Task["date"]>("")

    const [titleHasError, setTitleHasError] = useState(false)
    const [dateHasError, setDateHasError] = useState(false)

    if (!isOpen) return null

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault()

        setTitleHasError(false)
        setDateHasError(false)

        if (!title.trim()) {
            toast.error("O título da tarefa é obrigatório")
            setTitleHasError(true)
            return
        }
        if (!date) {
            toast.error("O prazo da tarefa é obrigatório")
            setDateHasError(true)
            return
        }

        const year = date.split('-')[0];
        if (Number(year) < 2026) {
            toast.error("Por favor, introduz um ano válido (igual ou superior a 2026).")
            return
        }

        onAddTask({ title: title.trim(), category, priority, date })

        setTitle("")
        setCategory("Frontend Task")
        setPriority("MEDIUM")
        setDate("")
        onClose()
        setTitleHasError(false)
        setDateHasError(false)
    }

    return (
        // Container que centraliza o modal no mobile e desktop
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">

            {/* Fundo escuro com desfoque de cinema */}
            <div onClick={onClose} className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs" />

            {/* O DIALOG: Otimizado para não estourar a tela no mobile (max-h) */}
            <dialog
                open
                className="relative z-10 flex flex-col w-[95%] max-w-md max-h-[90vh] rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-2xl overflow-hidden"
            >
                {/* Título do Modal */}
                <h2 className="text-xl text-slate-100 uppercase font-bold tracking-tight text-center pb-4 border-b border-slate-700/50">
                    Nova Tarefa
                </h2>


                <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4 overflow-y-auto pr-1">


                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-300 font-bold uppercase tracking-wider" htmlFor="title">Título da Tarefa</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Ex: Finalizar Layout de Login"
                            value={title}
                            onChange={
                                (e) => {
                                    setTitle(e.target.value)
                                    if (e.target.value.trim()) setTitleHasError(false)
                                }}
                            className={`text-sm bg-slate-900 border leading-10 rounded-lg px-3 text-slate-100 focus:outline-hidden  transition-colors placeholder:text-slate-600 ${titleHasError ? 'border-red-500 focus:border-red-500 bg-red-500/5' : ' border-slate-700 focus:border-yellow-500'
                                }`}
                        />
                    </div>


                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Categoria</label>
                        <div className="flex flex-wrap gap-x-2 gap-y-2.5">
                            {(["Frontend Task", "Backend Task", "UI/UX Task", "FullStack Task"] as Task["category"][]).map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    className={`uppercase px-3 py-2 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${category === cat
                                        ? cat === "Frontend Task"
                                            ? "bg-blue-500/20 text-blue-400 border-blue-500"
                                            : cat === "Backend Task"
                                                ? "bg-amber-500/20 text-amber-400 border-amber-500"
                                                : cat === "UI/UX Task"
                                                    ? "bg-purple-500/20 text-purple-400 border-purple-500"
                                                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500"
                                        : "bg-slate-900/40 border-slate-700 text-slate-400 active:bg-slate-700"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Prioridade</label>
                        <div className="flex gap-2 w-full">
                            {(['HIGH', 'MEDIUM', 'LOW'] as Task["priority"][]).map((prior) => (
                                <button
                                    key={prior}
                                    type="button"
                                    onClick={() => setPriority(prior)}
                                    className={`uppercase text-[11px] font-bold flex-1 text-center py-2.5 rounded-lg border transition-colors cursor-pointer ${priority === prior
                                        ? prior === 'HIGH'
                                            ? 'text-red-400 bg-red-400/20 border-red-400'
                                            : prior === 'MEDIUM'
                                                ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                                                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                                        : "bg-slate-900/40 border-slate-700 text-slate-400 active:bg-slate-700"
                                        }`}
                                >
                                    {prior === 'HIGH' && 'Alta'}
                                    {prior === 'MEDIUM' && 'Média'}
                                    {prior === 'LOW' && 'Baixa'}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col mb-2">
                        <label className="text-xs text-slate-300 font-bold uppercase tracking-wider mb-1" htmlFor="date">Data de Conclusão</label>
                        <input
                            id="date"
                            type="date"
                            min="2026-01-01"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value)
                                if (e.target.value) setDateHasError(false)
                            }}
                            className={`scheme-dark text-sm bg-slate-900 border  text-slate-100 leading-10 rounded-lg px-3 cursor-pointer focus:outline-hidden transition-colors ${
                                dateHasError ? 'border-red-500 focus:border-red-500 bg-red-500/5' : 'border-slate-700 focus:border-yellow-500'
                            }`}
                        />
                    </div>


                    <div className="text-sm flex justify-between gap-3 pt-4 border-t border-slate-700/50 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="font-bold uppercase w-1/2 bg-slate-700 text-slate-300 active:bg-slate-600 py-3 rounded-xl transition-colors cursor-pointer text-xs tracking-wider"
                        >
                            cancelar
                        </button>
                        <button
                            type="submit"
                            className="font-bold uppercase w-1/2 bg-yellow-500 text-yellow-950 active:bg-yellow-600 py-3 rounded-xl transition-colors shadow-md cursor-pointer text-xs tracking-wider"
                        >
                            Criar Tarefa
                        </button>
                    </div>

                </form>
            </dialog>
        </div>
    )
}