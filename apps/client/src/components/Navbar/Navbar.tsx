import { useAuth } from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar w-screen">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl"
          onClick={() => navigate(ROUTES.HOME)}
        >
          PokéRon
        </a>
      </div>
      <div className="flex-none">
        {user ? (
          <div className="flex items-center">
            <p>{user?.email}</p>
            <button
              className="btn btn-ghost"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              className="btn btn-ghost"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Sign Up
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};
