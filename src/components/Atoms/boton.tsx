
import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

const clases = {
    dark: 'btn btn-dark',
    light: 'btn btn-light',
    success: 'btn btn-success',
    danger: 'btn btn-danger',
    'outline-dark': 'btn btn-outline-dark',
    'outline-light': 'btn btn-outline-light',
    'outline-danger': 'btn btn-ouline-secondary',
    'outline-secondary': 'btn btn-outline-secondary',
    link: 'btn btn-link',
    submit: 'btn-submit',
    catalogo: 'btn btn-custom-dark',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    variante?: keyof typeof clases
    a?: string 
}

function Boton({ variante = 'dark', a, className = '',children, ...resto}:Props){
    const clase = `${clases[variante]} ${className}`.trim()

    if (a){
        return(
            <Link to={a} className={clase}>
                {children}
            </Link>
        )
    }

    return (
        <button className={clase}{...resto}>
            {children}
        </button>
    )
}

export default Boton

