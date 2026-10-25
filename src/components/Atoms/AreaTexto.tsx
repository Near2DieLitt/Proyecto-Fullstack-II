import type { TextareaHTMLAttributes } from "react";

function AreaTexto({ className = '', ...resto  }: TextareaHTMLAttributes<HTMLTextAreaElement>){
    return <textarea className={className}{...resto}/>
}

export default AreaTexto;