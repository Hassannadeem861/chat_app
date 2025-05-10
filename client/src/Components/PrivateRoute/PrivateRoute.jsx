import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    // console.log("children: ", children);
    
    const token = useSelector((state) => state.user.token);
    // console.log("token: ", token);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
