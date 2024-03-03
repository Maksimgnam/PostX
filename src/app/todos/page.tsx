"use client"
import React from 'react'
async function getTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const result = await res.json();
    return result
}
const page = async () => {
    const todos = await getTodos()
    return (
        <div className='w-full h-full   overflow-y-scroll  '>
            {
                todos.map(item => (
                    <div className='w-9/12 h-auto  border-slate-100 rounded-xl border-2 m-2 p-4 relative left-20' key={item.id}>
                        <h2 className='text-xl font-semibold'>{item.title}</h2>
                        {item.completed && (
                            <div className='w-full h-11  flex items-end justify-end'>
                                <button className='w-28 h-9 bg-sky-400 rounded-lg'>
                                    <p className='text-md  text-white font-semibold'>Completed</p>

                                </button>
                            </div>
                        )}
                        {item.completed === false && (
                            <div className='w-full h-11  flex items-end justify-end'>
                                <button className='w-20 h-9 bg-red-400 rounded-lg'>
                                    <p className='text-md  text-white font-semibold'>None</p>

                                </button>
                            </div>
                        )}

                    </div>
                ))
            }
        </div>
    )
}

export default page