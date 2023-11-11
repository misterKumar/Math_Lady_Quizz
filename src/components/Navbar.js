import "../styles/navbar.css"
import { BsGrid, BsAward } from "react-icons/bs";
import { FiBook, FiBell, FiChevronDown} from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FcMindMap } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import { useState } from "react";
import logo from "../asset/quiz-time-neon-signs-style-text_118419-3213.avif";
const Navbar = () => {
    const [isClick, setIsClicked] = useState(false)
    return (
        <div className='navbar'>
            <div className='nav_left'>
               
                <img src={logo} alt="" />

            </div>

            <div className={`${!isClick ? 'mid_nav' : 'mid_nav mid_nav2'}`}>
                <div>
                    <BsGrid className="icon" />
                    <div>Dashboard</div>
                </div>

                <div className="course">

                    <FiBook className="icon" />
                    <div>Course</div>
                </div>
                <div>
                    <BsAward className="icon" />
                    <div> Achievement</div>
                </div>

                <div>
                    <FcMindMap className="icon" />
                    <div>Learning </div>
                </div>




            </div>

            <div className='nav_right'>
                <FaRegCircleUser className="icon" />
                <Badge badgeContent={1} color="error">
                    <FiBell className="icon" />
                </Badge>
                <FiChevronDown className={`forRedcolor ${!isClick ? "icon " : "icon icon2"}`} onClick={() => setIsClicked(!isClick)} />

            </div>

        </div>
    )
}

export default Navbar