import {motion} from "framer-motion"
import * as React from "react"

interface PageAnimationProps{
    children: React.ReactNode
}

export default function PageAnimation({children}: PageAnimationProps){
    return (
        <motion.section
            initial={{opacity: 0, translateY: 30}}
            animate={{opacity: 1, translateY: 0}}
            transition={{duration: .25}}>
            {children}
        </motion.section>
    )
}
