import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/routing/urls";
import { selectAuthUser } from "src/store/sharedStore/authStore/selectors";

export default function AdminHOC(Component: React.FC) {
  const WrappedComponent: React.FC = (props) => {
    const navigate = useNavigate();
    const user = useSelector(selectAuthUser);

    useEffect(() => {
      if (!user?.isAdmin) {
        navigate(ROUTES.ROOT);
      }
    }, [user, navigate]);

    return <Component {...props} />;
  };

  return WrappedComponent;
}
