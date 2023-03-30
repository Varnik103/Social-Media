import React , {useState, useRef} from 'react'
import img1 from '../../img/img1.jpg'
import {AiOutlinePlayCircle} from "react-icons/ai"
import {AiOutlinePicture} from "react-icons/ai"
import {AiOutlineSchedule} from "react-icons/ai"
import {BiLocationPlus} from "react-icons/bi"
import {AiOutlineClose} from "react-icons/ai"
import './PostShare.css'

const PostShare = () => {
    const [image,setImage] = useState(null)
    const imageRef = useRef()

    const onImageChange=(event)=>{
        if(event.target.files && event.target.files[0]){
            let img=event.target.files[0];
            setImage({
                image:URL.createObjectURL(img),
            });
        }
    }

  return (
    <div className="PostShare">
        <img src={img1} alt="" />
        <div>
            <input type="text" placeholder="What's happening" />
            <div className="PostOptions">
                <div className="option"
                style={{color: "var(--photo)"}}
                onClick={()=>imageRef.current.click()}>
                    <AiOutlinePicture/>
                    Photo
                </div>
                <div className="option"
                style={{color: "var(--video)"}}>
                    <AiOutlinePlayCircle/>
                    Video
                </div>
                <div className="option"
                style={{color: "var(--location)"}}>
                    <BiLocationPlus/>
                    Location
                </div>
                <div className="option"
                style={{color: "var(--schedule)"}}>
                    <AiOutlineSchedule/>
                    Schedule
                </div>
                <button className='button ps-button'>
                    Share
                </button>

                <div style={{display:"none"}}>
                    <input type="file" name="myImage" ref={imageRef} 
                    onChange={onImageChange}/>
                </div>

            </div>
            {image && (
                <div className="previewImage">
                    <AiOutlineClose style={{color:"black"}} onClick={()=>setImage(null)}/>
                    <img src={image.image} alt="" />
                </div>
            )}
        </div>
    </div>

  )
}

export default PostShare
