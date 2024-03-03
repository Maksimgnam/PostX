"use client"
import Link from "next/link"
import { FC } from "react"


interface HeaderProps {
    searchTitle: string,
    setSearchTitle: React.Dispatch<React.SetStateAction<string>>,
    onFilter: () => void,

}

const Header: FC<HeaderProps> = ({ searchTitle, setSearchTitle, onFilter }) => {

    return (
        <div className="header flex items-center justify-around">
            <div>
                <Link href="/">
                    <button className="w-20 h-14 text-xl font-semibold ">PostsX</button>
                </Link>

            </div>
            <div className="w-3/5 h-14 flex items-center justify-between">


                <input value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} type="text" placeholder="Search..." className="w-4/5 h-10 rounded-2xl bg-slate-100 outline-none pl-3" />
                <button onClick={onFilter} className="w-10 h-10 bg-sky-300 rounded-lg flex items-center justify-center">
                    <img className="w-5 h-5" src="https://static-00.iconduck.com/assets.00/filter-icon-2048x1617-97le7v6v.png" alt="" />
                </button>
            </div>



        </div>
    )
}

export default Header