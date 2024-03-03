import React, { FC } from 'react';


interface FilterProps {
    onUserChange: (userId: number | null) => void;

}

const Filter: FC<FilterProps> = ({ onUserChange }) => {

    const userChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = parseInt(e.target.value, 10);
        onUserChange(isNaN(selectedUserId) ? null : selectedUserId);
    }
    return (
        <div className='w-32 h-24 bg-slate-100 rounded-xl flex flex-col items-center justify-around  '>
            <h2 className='text-xl font-semibold'>Filter</h2>
            <select onChange={userChange} name="" id="" className='w-11/12 h-11 text-md font-medium rounded-xl outline-none relative bottom-2'>
                <option value="">All Users</option>
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
                <option value="4">User 4</option>
                <option value="5">User 5</option>
                <option value="6">User 6</option>
                <option value="7">User 7</option>
                <option value="8">User 8</option>
                <option value="9">User 9</option>

            </select>

        </div>
    )
}

export default Filter