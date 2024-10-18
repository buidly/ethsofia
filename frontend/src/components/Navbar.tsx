import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <div>
      <nav className="mt-6">
        <div className="container mx-auto flex justify-between p-6 bg-red-50 rounded-3xl">
          <Link to="/">
            <img src="/snapdata-logo.png" alt="Logo" className="h-12" />
          </Link>
          <div>
            <a href="/login" className="mr-4">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>
      </nav>
    </div>
  );
}

