import React, {useEffect,useState} from 'react'
import './UpdateNote.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';



function NewNote(){
    const [title, setTitle]=useState('');
    const [category,setCategory]=useState('');
    const[content,setContent]=useState('');

    const loadNote = async (id) => {
        if(!id) return

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/${id}`)

    setTitle(response.data.data.title)
    setCategory(response.data.data.category)
    setContent(response.data.data.content)
    }

    const updateNote = async() => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`,
    {
      title: title,
      category: category,
      content: content
    })
    toast.success(response.data.message)
    window.location.href = '/'
  }

    const {id} = useParams()


    useEffect(()=>{
        loadNote(id)
    }, {id})



   return(
        <div><h1 className='app-header'>Update Note</h1>
        <p>{id}</p>
        <form className='form-new-note'>

        <input type='text' 
        value={id}
        disabled
        className='input-id'/>

        <input type='text' 
        placeholder="Title"
        value={title}
        onChange={(e)=>{
            setTitle(e.target.value)
        }} className='input-title'/>

        <select value={category}
        onChange={(e)=>{
            setCategory(e.target.value)

        }}
        className='input-category'>
            <option value="">Select a category</option>
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="learning">Learning</option>
        <option value="other">Other</option>
        </select>

        <input type='text'
        placeholder='Content'
        value={content}
        className='input-content'
        onChange={(e)=>{
            setContent(e.target.value)
        }}/>

        <button type='button'
         onClick={updateNote}
         className='button-save'>Update
        </button>
        </form>
        </div>
    )
}

export default NewNote


