import { CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { selectPosts, selectPostsRequestLoading } from "../store/selectors";

const PostsList: React.FC = () => {
  const data = useSelector(selectPosts);
  const postsRequestLoading = useSelector(selectPostsRequestLoading);

  return (
    <div>
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        {postsRequestLoading ? <CircularProgress /> : null}
        {!postsRequestLoading && !data.length ? <span>empty list </span> : null}
        {!postsRequestLoading && data.length
          ? data.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography>{item}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))
          : null}
      </List>
    </div>
  );
};

export default PostsList;
