"use client"
import Nav from "./Nav";
import { AnimatePresence } from "framer-motion";
const BurgerMenu = ({ isActive, setIsActive }: { isActive: any; setIsActive: any }) => {
    return (
        <>
            <div onClick={() => { setIsActive(!isActive) }} className='fixed mt-[60px] right-6 m-[20px] z-30 w-[80px] h-[80px] rounded-full bg-[#455CE9] cursor-pointer flex items-center justify-center' >
                <div className={` w-full before:content-[''] before:block before:h-px  before:w-2/5 before:mx-auto before:bg-white before:relative before:transition-transform before:duration-300 
                after:content-[''] after:block after:h-px after:w-2/5 after:mx-auto after:bg-white after:relative after:transition-transform after:duration-300 ${isActive ? "before:rotate-[-45deg] before:top-0 after:rotate-[45deg] after:top-[-1px]" : "before:top-[5px] after:top-[-5px]"}`}></div>
            </div>
            <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
        </>


    )
}
export default BurgerMenu