import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const menuAnimation = {
    hidden :{
        opacity:0,
        height:0,
        padding:0,
        transtion:{duration:0.3,when:"afterChildren"},
    },
    show :{
        opacity:1,
        height:"auto",
        transtion:{
            duration:0.3,
            when:"beforeChildren",
        },
    },
};

const menuItemAnimation = {
    hidden : (i) => ({
        padding:0,
        x:'-100%',
        transtion:{
            duration:(i+1)*0.1,
        },
    }),
    show:(i) => ({
        x:0,
        transtion:{
            duration:(i+1)*0.1,
        },
    }),
};

const SidebarMenu = ({isOpen, route,showAnimation,setIsOpen}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () =>{
        setIsMenuOpen(!isMenuOpen);
        setIsOpen(true);
    };

    useEffect(()=>{
        if(!isOpen){
            setIsMenuOpen(false);
        }
    },[isOpen]);

    return (
        <>
        <div className='menu' onClick={toggleMenu}>
            <div className='menu_item'>
                <div className='icon'>{route.icon} </div>
                <AnimatePresence>
                    {isOpen &&(
                        <motion.div
                        varients={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                        style={{cursor:"pointer"}}>
                            {route.name}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {isOpen && (
                <motion.div
                animate={isMenuOpen ? {rotate:0}:{rotate:-90}}
                style={{cursor:"pointer"}}>
                    <FaAngleDown />
                </motion.div>
            )}
        </div>
        <AnimatePresence>
            {isMenuOpen &&(
                <motion.div
                varients={menuAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="menu_container">
                    {route.subRoutes.map((subRoute, i)=>(
                        <motion.div
                        varients={menuAnimation} key={i} custom={i}>
                            <NavLink to={subRoute.path} className="link">
                                <div className='icon_sub'>{subRoute.icon}</div>
                                <motion.div className="link_text_sub">{subRoute.name}</motion.div>
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export default SidebarMenu;
