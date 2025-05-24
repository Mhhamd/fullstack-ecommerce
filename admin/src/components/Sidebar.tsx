import { IoIosAddCircleOutline } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="border-r h-screen border-gray-500 w-2/14 pl-15 py-10">
            <div className="flex items-center gap-5 flex-col">
                <NavLink
                    to={'/add'}
                    className="bg-white text-black border border-gray-500 border-r-0 text-center w-full py-2 hover:bg-black hover:text-white transition-all duration-300 tracking-wide font-medium flex items-center gap-2 pl-5 "
                >
                    <IoIosAddCircleOutline className="text-xl" />
                    Add Item
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
