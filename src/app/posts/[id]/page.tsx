"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

async function getPosts(id: number) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const result = await res.json();
    return result;
}

interface PostProps {
    params: {
        id: string;
    };
}

const Post: React.FC<PostProps> = ({ params: { id } }) => {
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPost = await getPosts(Number(id));
            setPost(fetchedPost);
        };

        fetchPost();
    }, [id]);


    return (
        <div className='w-full h-full'>
            <div className='w-full h-14 flex items-center justify-center'>
                <h2 className='text-2xl font-medium'>Post information</h2>
            </div>
            <div className='w-full h-5/6 '>


                {post && (
                    <div className='flex'>

                        <div key={post.id} className="w-post h-auto border-2 border-slate-100 rounded-xl m-6 mt-1 p-2 relative left-2 ">
                            <h2 className="text-2xl font-medium">{post.title}</h2>
                            <div className="w-full h-auto p-1">
                                <p className=" text-xl">{post.body}</p>
                            </div>
                            <div className="w-full h-10 flex justify-end pl-2">

                                <button className="w-24 h-10 bg-sky-400 rounded-2xl  relative right-3 ">
                                    <Link href="/">
                                        <p className="text-md font-medium text-white">     Назад</p>
                                    </Link>



                                </button>
                            </div>





                        </div>

                    </div>
                )}



            </div>
        </div >
    );
};

export default Post;

