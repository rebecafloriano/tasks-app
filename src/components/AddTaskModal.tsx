import { useState } from "react"
import { type Task } from "../types/taskProps"

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

    return (
        <div >
            <div>

            </div>
            <div>
                <dialog className="flex flex-col w-[90%] h-120 m-auto rounded-xl border border-slate-800 bg-slate-950 p-6">
                    <h2 className="text-2xl tracking-tight text-slate-100 uppercase font-semibold mx-auto">Nova Tarefa</h2>
                    <form className="flex flex-col gap-4" bindsubmit="">
                        <div className="flex flex-col">
                            <label className="text-md text-slate-400 font-semibold" htmlFor="title">Título da Tarefa</label>
                            <input placeholder="Ex: Finalizar Layout de Login" className="text-sm bg-slate-200 leading-8 rounded-md px-2" type="text" name="title" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-md text-slate-400 font-semibold" htmlFor="category">Categoria</label>

                            <div className="flex flex-wrap gap-2">

                                {(["Frontend Task", "Backend Task", "UI/UX Task", "FullStack Task"] as const).map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`px-3 py-2 text-xs font-semibold rounded-md border transition-all cursor-pointer ${category === cat
                                            ? cat === "Frontend Task"
                                                ? "bg-blue-500/20 text-blue-400 border-blue-500 shadow-xs"
                                                : cat === "Backend Task"
                                                    ? "bg-amber-500/20 text-amber-400 border-amber-500 shadow-xs"
                                                    : cat === "UI/UX Task"
                                                        ? "bg-purple-500/20 text-purple-400 border-purple-500 shadow-xs"
                                                        : "bg-emerald-500/20 text-emerald-400 border-emerald-500 shadow-xs"
                                            : "bg-slate-900/50 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600"
                                            }`}
                                    >
                                        
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>


                    </form>

                </dialog>
            </div>



        </div>

    )
}

