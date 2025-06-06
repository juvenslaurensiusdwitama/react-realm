import fireMage from '../assets/fireMage.png'
import archer from '../assets/archer.png'
import necromancer from '../assets/necromancer.png'
import swordsMan from '../assets/swordsMan.png'
import rogue from '../assets/rogue.png'
import cleric from '../assets/cleric.png'
import berserker from '../assets/berserker.png'
import iceMage from '../assets/iceMage.png'
import ninja from '../assets/ninja.png'

const AvatarValidation = ({className, data}) => {
    return (
        <img src={
            data === "archer" ? archer
                : data === "fireMage" ? fireMage
                    : data === "berserker" ? berserker
                        : data === "rogue" ? rogue
                            : data === "swordsMan" ? swordsMan
                                : data === "cleric" ? cleric
                                    : data === "ninja" ? ninja
                                        : data === "iceMage" ? iceMage
                                            : data === "necromancer" ? necromancer
                                                : null
        } alt="avatar" className={className} />
    )
}

export default AvatarValidation