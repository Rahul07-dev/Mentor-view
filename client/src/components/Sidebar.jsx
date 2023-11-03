import { NavLink, useLocation } from "react-router-dom";


const Sidebar = () => {
    const location = useLocation();
    const { pathname } = location;
    const parts = pathname.split('/');

    console.log(parts[1])
    return (
        <div>
            <div className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200`} aria-hidden="true"></div>
            <div
                id="sidebar"
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-[#0C0A09] motion-reduce:transition-none dark:border-zinc-800 border-zinc-200 border-r p-4 transition-all duration-200 ease-in-out`}
            >
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    <NavLink exact to="/" className="flex items-center gap-2">
                        <span className="font-amaranth text-stone-100 font-bold text-3xl">Dashboard</span>
                    </NavLink>
                </div>

                <div className="space-y-8">
                    <div>
                        <ul className="mt-3">
                            <li className={`px-3 py-2 rounded-lg mb-0.5 last:mb-0  ${pathname === `/${parts[1]}` && 'bg-blue-900'} `}>
                                <NavLink exact to={`/${parts[1]}`} className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname === '/profile' && 'hover:text-gray-200 font-bold'}`}>
                                    <div className="flex items-center">
                                        <span className={`text-sm font-medium ml-3  lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}>Group</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('assign') && 'bg-blue-900'}`}>
                                <NavLink exact to={`/${parts[1]}/assign`} className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname.includes('assign') && 'hover:text-gray-200'}`}>
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Assign</span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar