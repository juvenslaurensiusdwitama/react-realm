import bronzeThropy from '../assets/bronze24.png'
import silverThropy from '../assets/silver24.png'
import goldThropy from '../assets/gold24.png'

const ThropyValidation = ({data}) => {
    return (
        <img src={
            data === "bronzeThropy" ? bronzeThropy
                : data === "silverThropy" ? silverThropy
                    : data === "goldThropy" ? goldThropy 
                        : null
        } alt="" className='h-[18px]' />
    )
}

export default ThropyValidation