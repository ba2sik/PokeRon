import { useAuth } from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import PokeballIcon from '/pokeball.svg';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar w-screen">
      <div className="flex-1">
        <div
          className="btn btn-ghost text-2xl font-bold p-0"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <img
            className="w-10"
            src={PokeballIcon}
            alt="Pokemon Logo"
          />
          <h1>PokéRon</h1>
        </div>
      </div>
      <div className="flex-none">
        {user ? (
          <div className="flex items-center gap-4">
            <p>{user?.email}</p>
            <button
              className="btn btn-primary"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Sign Up
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
