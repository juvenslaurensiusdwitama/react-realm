import noviceCoder from '../assets/noviceCoder24.png'
import reactEnthusiast from '../assets/reactEnthusiast24.png'
import jsxDebugger from '../assets/jsxDebugger24.png'
import jsxArchitect from '../assets/jsxArchitect24.png'
import componentMaster from '../assets/componentMaster24.png'
import componentExpert from '../assets/componentExpert24.png'

const BadgesValidation = ({ className, data }) => {
    if(data){
        return (
            <img src={
                data === "Novice Coder" ? noviceCoder
                    : data === "React Enthusiast" ? reactEnthusiast
                        : data === "JSX Debugger" ? jsxDebugger
                            : data === "JSX Architect" ? jsxArchitect
                                : data === "Component Master" ? componentMaster
                                    : data === "Component Expert" ? componentExpert
                                        : null
            } alt="badges" />
        )
    }else{
        return <p className={`text-[12px] w-full text-center ${className}`}>No badges</p>
    }
}

export default BadgesValidation