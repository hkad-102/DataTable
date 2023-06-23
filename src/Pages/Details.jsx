import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Details = () => {
    const {postId} = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        fetchPost();
    }, [])

    const fetchPost = async() => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            const data = res.data;
            setPost(data)
        } catch (err) {
            console.log(err);
        }
    }

    if(!post){
        <div>Loading...</div>
    }
  return (
    <div className='p-10 bg-indigo-400 text-white h-screen w-screen'>
        <h1 className='text-center text-3xl font-bold mb-4'>Details Page</h1>
      <h2 className='font-bold text-2xl capitalize mb-4'>Title : {post.title}</h2>
      <p className='text-xl capitalize'>Body: {post.body}</p>
    </div>
  )
}

export default Details
