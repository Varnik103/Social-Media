import React, { useEffect } from "react";
// import { PostsData } from '../../Data/PostsData'
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import "./Posts.css";
import { getTimelinePosts } from "../../actions/postAction";

const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const loading = useSelector((state) => state.postReducer.loading);
// console.log(posts)
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
