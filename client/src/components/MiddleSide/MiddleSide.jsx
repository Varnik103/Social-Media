import React from "react"
import './MiddleSide.css'
import ProfileTop from '../ProfileTop/ProfileTop'
import PostShare from "../PostShare/PostShare"

const MiddleSide = () => {
    return (
        <div className="MiddleSide">
            <ProfileTop/>
            <PostShare/>
        </div>
    )
}
export default MiddleSide