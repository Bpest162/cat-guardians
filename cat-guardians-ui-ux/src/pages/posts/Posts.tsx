import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";

import PostsList from "./components/PostsList";
import { fetchPosts } from "./store/actions";

const Posts: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts.request({}));
  }, []);

  return (
    <div>
      <PostsList />
    </div>
  );
};

export default memo(Posts);
