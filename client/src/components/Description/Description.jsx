import React from 'react'
import './Description.css'
import { Description } from '../../Data/Description'

const Descriptions = () => {
    return (
        <div className='Description'>
            <h4>About You</h4>
            {Description.map((desc) => {
                return(
                    <div className='desc'>
                        <h4>Lives In - <span className='livesin'>{desc.livesIn}</span></h4>
                        <h4>Works At - <span className='worksat'>{desc.worksAt}</span></h4>
                    </div>
                )
            })}
        </div>
    )
}

export default Descriptions