import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckAuth } from "src/store/sharedStore/authStore/actions";
import { selectAuthUser } from "src/store/sharedStore/authStore/selectors";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    dispatch(fetchCheckAuth.request({}));
  }, [dispatch]);

  return user;
};

export default useAuthCheck;
