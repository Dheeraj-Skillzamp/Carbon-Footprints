import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import SidebarMenu from './SidebarMenu';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';



const routes = [
    {
        path: "/dashboard",
        name: "Home",
        icon: <AiFillHome />
    },
    {
        // path: "/profile/calculate-fuel",
        name: "Fuel",
        // icon:<AiFillHome />,
        subRoutes: [
            {
                path: "/profile/calculate-fuel",
                name: "Calculate Fuel",
            },
            {
                path: "/profile/fuel-details",
                name: "Get Fuel Details",
                // icon:<AiFillHome />
            },
            {
                path: "/profile/monthly-fuel",
                name: "Monthly Fuel Details",
                // icon:<AiFillHome />
            },

        ]
    },
    {
        // path: "/profile/set-goal",
        name: "Goals",
        // icon:<AiFillHome />,
        subRoutes: [
            {
                path: "/profile/goal-details",
                name: "Goal Details",
            },
            {
                path: "/profile/set-goal",
                name: "Set Goals",
            }
        ]
    },
    {
        // path: "/profile/leaderboard",
        name: "LeaderBoard",
        subRoutes: [
            {
                path: "/profile/leaderboard",
                name: "LeaderBoard",
            }
        ]
    },
    {
        path: "/profile",
        name: "Profile",
        // icon:<AiFillHome />,
        subRoutes: [
            {
                path: "/profile",
                name: "Profile",

            },
            {
                path: "/profile/edit-profile",
                name: "Edit Profile",
            },
            {
                path: "/profile/favourite-tips",
                name: "Favourite Tips"
            }
        ]
    },
    {
        path: "/admin/emission-tips",
        name: "Emission Tips"
    },
    {
        path: "/",
        name: "Log Out"
    }

];

const role = localStorage.getItem('userRole');
console.log("Role", role);

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [modifiedRoutes, setModifiedRoutes] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        let filteredRoutes = [...routes];
        if (role === "user") {
            filteredRoutes = filteredRoutes.filter((route) => {
                return (
                    route.path !== "/admin/emission-tips" || route.path.startsWith("/login")
                );
            });
        }
        setModifiedRoutes(filteredRoutes);
    }, []);

    const toggle = () => setIsOpen(!isOpen);

    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.2,
            },
        },
        show: {
            width: "140px",
            padding: "5px 15px",
            transition: {
                duration: 0.2,
            },
        },
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0.5,
            },
        },
    };


    return (
        <>
            <div className='main-container'>
                <motion.div
                    animate={{
                        width: isOpen ? "285px" : "55px",
                        transition: { duration: 0.5, type: "spring", damping: 10 },
                    }}
                    className={`sidebar`}
                >
                    <div className='top_section'>
                        <div className='bars'>
                            <FaBars onClick={toggle} />
                        </div>
                    </div>

                    <section className='routes'>
                        {modifiedRoutes.map((route, index) => {
                            if (route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        key={index}
                                        setIsOpen={setIsOpen}
                                        route={route}
                                        showAnimation={showAnimation}
                                        isOpen={isOpen} />
                                );
                            } else {
                                return (
                                    <NavLink
                                        to={route.path}
                                        key={index}
                                        className="link"
                                        activeClassName="active">
                                        <div className='icon'>{route.icon} </div>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    variants={showAnimation}
                                                    initial="hidden"
                                                    animate="show"
                                                    exit="hidden"
                                                    className='link_text pe-auto'>
                                                    {route.name}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </NavLink>
                                );
                            }
                        })}

                    </section>
                </motion.div>

                <main>{children}</main>
            </div>
        </>
    );
}

export default Sidebar;
