import React from 'react'
import './NoteCard.css'
import DeleteIcon from "./bin.png"
import axios from 'axios'
import toast from 'react-hot-toast'
import UpdateIcon from "./update-icon.png"
import { Link } from 'react-router-dom'


function NoteCard ({_id, title, content, category, loadNotes}) {

const deleteNote=async()=>{
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${_id}`)
toast.success(response.data.message)
loadNotes()
}

  return (
    <div className='note-card'>
        <h3 className='note-card-title'>{title}</h3>
        <p className='note-card-content'>{content}</p>
        <span className='note-card-category'>{category}</span>
        <img src={DeleteIcon} 
        alt='bin.png' className='delete-icon'
        onClick={deleteNote}/>

        <Link to={`/update/${_id}`}>
          <img src={UpdateIcon}
          alt='update-icon'
          className='update-icon'/>
        </Link>
    </div>
  )
}

export default NoteCard