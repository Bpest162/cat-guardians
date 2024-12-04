import { GET_POSTS } from "src/constants/api";
import { get } from "src/services/http/api";

export const getPosts = () => get(GET_POSTS);
