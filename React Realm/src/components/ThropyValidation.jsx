import bronzeThropy from '../assets/bronze24.png'
import silverThropy from '../assets/silver24.png'
import goldThropy from '../assets/gold24.png'

const ThropyValidation = ({className, data}) => {
    if(data){
        return (
            <img src={
                data === "bronzeThropy" ? bronzeThropy
                    : data === "silverThropy" ? silverThropy
                        : data === "goldThropy" ? goldThropy 
                            : null
            } alt="thropy" className='h-[18px]' />
        )
    }else{
        return <p className={`text-[12px] w-full text-center ${className}`}>No thropy</p>
    }
}

export default ThropyValidation