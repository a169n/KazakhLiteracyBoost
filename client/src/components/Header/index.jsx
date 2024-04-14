import { useUser } from "@/hooks/useUser";
import { IconUserSquareRounded } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import { useGetUserQuery } from "@/store/services/usersApi";

const Header = () => {
  const user = useUser();
  const dispatch = useDispatch();

  const { data: userData } = useGetUserQuery(user?.token);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <ul className="flex items-center justify-end gap-3 ml-auto">
      {user ? (
        <button
          onClick={handleLogout}
          className="text-[#003050] hover:text-[#0066CC] transition-colors duration-300">
          Logout
        </button>
      ) : (
        <Link
          className="text-[#003050] hover:text-[#0066CC] transition-colors duration-300"
          to={"/login"}>
          Login
        </Link>
      )}
      {user && (
        <div>
          <div className="flex items-center gap-4">
            <Link to={"/profile"} className="hover:text-[#0066CC]">
              <IconUserSquareRounded
                size={47}
                stroke={1.5}
                color="#003B8C"
                className="hover:opacity-70 transition-opacity duration-300"
              />
            </Link>
            <div className="flex flex-col">
              <p className="font-medium text-sm leading-[21px] text-[#003050]">
                {userData?.username}
              </p>
              <p className="font-medium text-[12px] leading-[18px] text-[#003050]">
                Exp: <b>{userData?.points}</b>
              </p>
            </div>
          </div>
        </div>
      )}
    </ul>
  );
};

export default Header;
