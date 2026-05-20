import type { CardProps } from "../types/cardProps"
export const TaskCard = ({ task, ...props}: CardProps) => {

    const progressValue = task.progress ?? 0;

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
        <div className="border border-slate-800 bg-slate-950 p-5 rounded-xl ">
            <div className="flex justify-between mb-2">
                <span className="rounded-md border border-slate-800 py-1 px-2  bg-slate-900 font-semibold text-slate-400 text-xs">{task.category}</span>
                <span className={`rounded-md border py-1 px-2  font-bold text-xs uppercase ${getPriorityStyles(task.priority)}`}>{task.priority}</span>
            </div>
            <h3 className="font-semibold text-base mb-4">{task.title || "Fix Login Layout"}</h3> 
            <div className="flex justify-between mb-1 text-xs text-slate-500">
                <span>Due: {task.date}</span>
                <span>{ task.progress}%</span>
            </div>
            <div className=" w-full h-1.5 rounded-2xl bg-slate-800">
                <div className={`${progressValue === 100 ? "bg-green-500" : "bg-blue-600"}  h-1.5 rounded-2xl  transition-all duration-300`} style={{width: `${progressValue}%`}}>
                </div>
            </div>
            
        </div>
    )
}
