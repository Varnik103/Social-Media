import React, { useState, useRef } from "react";
import img1 from "../../img/img1.jpg";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlinePicture } from "react-icons/ai";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiLocationPlus } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import "./PostShare.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";

const PostShare = () => {
  const loading = useSelector((state)=>state.postReducer.uploading)
  const dispatch = useDispatch();
  const  user  = useSelector((state)=>state.authReducer.authData)
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset =()=> {
    setImage(null);
    desc.current.value="";
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const newPost = {
      userid: user._id,
      desc: desc.current.value
    }

    if(image){
        const data = new FormData();
        const filename = Date.now() + image.name
        data.append("name",filename)
        data.append("file",image)
        newPost.image = filename;
        try{
            dispatch(uploadImage(data))
        }
        catch(error){
            console.log(error)
        }
    }
    dispatch(uploadPost(newPost))
    reset();    
  }

  return (
    <div className="PostShare">
      <img src={img1} alt="" />
      <div>
        <input 
        ref = {desc}
        required
        type="text" placeholder="What's happening" />
        <div className="PostOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <AiOutlinePicture />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <AiOutlinePlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <BiLocationPlus />
            Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <AiOutlineSchedule />
            Schedule
          </div>
          <button className="button ps-button" onClick={handleSubmit}
          disabled={loading}>
            {loading? "Uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <AiOutlineClose
              style={{ color: "black" }}
              onClick={() => setImage(null)}
            />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
