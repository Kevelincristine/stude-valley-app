import { useState } from "react";

interface TaskCardInterface {
    title: string;
    dificulty: "cobre" | "prata" | "ouro";
    category: string;
    
}

export function TaskCard({title, dificulty, category}: TaskCardInterface) {
 const [Feito,setFeito] = 
    useState(false);
return(
    <div className="bg-white border-2 border-primary p-4 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
   <div className="flex items-center gap-4">
  {/* O círculo do Checkbox */}
  <div className="w-6 h-6 rounded-full border-2 border-secondary cursor-pointer hover:bg-stude-green/20" />
        
        <div>
  <h3 className="font-bold text-font text-lg">{title}</h3>
  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-background text-stude-pink uppercase">
            {category}
          </span>
        </div>
   </div>
   <div className="text-right">
        <span className="text-2xl">
         {dificulty === "cobre" ? "🥉" : dificulty === "prata" ? "🥈" : "🥇"}
        </span>
      </div>
    </div>
);

}