

"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Filter from "./Filter/Filter";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}





export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [editedTitle, setEditTitle] = useState<string>('');
  const [editedBody, setEditBody] = useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const getPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const result: Post[] = await res.json();
    setPosts(result);
  };

  useEffect(() => {
    getPosts();
  }, []);
  const deletePost = async (id: number) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post.id !== id))


    } catch (error) {
      console.log("ddd", error)
    }
  }

  const edit = (post: Post) => {
    setEditPost(post);
    setEditTitle(post.title)
    setEditBody(post.body)
  }

  const saveEdit = async () => {
    try {
      if (!editPost) return;


      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...editPost,
          title: editedTitle,
          body: editedBody,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const data: Post = await response.json();
      setPosts(posts.map((post) => (post.id === editPost.id ? data : post)));
      setEditPost(null);
      setEditTitle('');
      setEditBody('');
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };



  const filteredPosts = posts.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      (selectedUser === null || item.userId === selectedUser)
  );


  const userChange = (userId: number | null) => {
    setSelectedUser(userId)
  }


  const filterChange = () => {
    setIsFilter(!isFilter)
  }






  return (
    <>
      <Header searchTitle={searchTitle} setSearchTitle={setSearchTitle} onFilter={filterChange} />
      <main className="w-full h-full overflow-y-scroll">
        {filteredPosts.map((el) => (
          <div className="flex">
            {
              editPost === el ? (
                <>
                  <div className="h-full ">
                    <button onClick={() => setEditPost(null)} className="w-10 h-10 bg-sky-400 rounded-full">
                      <p className="text-lg text-white font-bold">{`<`}</p>

                    </button>

                  </div>

                  <div className="edit  flex items-center justify-center ">
                    <div className="w-full h-full rounded-lg flex flex-col items-center justify-between">
                      <textarea value={editedTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-96 h-20 bg-slate-100 rounded-lg outline-none resize-none p-2" />
                      <textarea value={editedBody} onChange={(e) => setEditBody(e.target.value)} className="w-96 h-44 bg-slate-100 rounded-lg  outline-none resize-none p-2" />
                      <button onClick={saveEdit} className="w-11/12 h-12 bg-sky-400 rounded-xl">
                        <p className="text-xl text-white font-semibold">Зберегти</p>
                      </button>
                    </div>
                  </div>

                </>

              ) :
                (<>

                  <div key={el.id} className="w-post h-auto border-2 border-slate-100 rounded-xl m-6 mt-1 p-2 relative left-2">
                    <div className="w-full h-auto flex items-center">
                      <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center m-1">
                        <p className="text-md font-semibold">#{el.userId}</p>
                      </div>
                      <h2 className="text-lg font-semibold relative left-1">
                        <span className="text-lg text-slate-400 font-medium">User:</span> #{el.userId}
                      </h2>
                    </div>

                    <h2 className="text-2xl font-medium">{el.title}</h2>
                    <div className="w-full h-auto p-1">
                      <p className=" text-xl">{el.body}</p>
                    </div>

                    <div className="w-full h-12 flex justify-end">

                      <Link href={`/posts/${el.id}`}>
                        <div className="w-24 h-10 bg-sky-400 rounded-2xl flex items-center justify-center relative right-3">
                          <p className="text-md font-medium text-white">Більше</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className='w-16 h-auto  flex justify-end items-end'>
                    <div className='w-14 h-24  flex flex-col justify-between items-center'>
                      <button onClick={() => edit(el)} className='w-10 h-10 text-xl text-white font-medium bg-sky-400 rounded-full flex items-center justify-center '>
                        <img className='w-6 h-6' src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="" />
                      </button>
                      <button onClick={() => deletePost(el.id)} className='w-10 h-10 bg-red-400 rounded-lg flex items-center justify-center '>
                        <img className='w-5 h-5' src="https://static-00.iconduck.com/assets.00/delete-icon-1864x2048-bp2i0gor.png" alt="" />
                      </button>


                    </div>
                  </div>
                </>)
            }

          </div>

        ))
        }
      </main >
      {
        isFilter && (
          <div className="w-2/6 h-auto absolute top-14 flex justify-end">
            <Filter onUserChange={userChange} />
          </div>

        )
      }

    </>
  );
}
