import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <div>
      <nav className="mt-6">
        <div className="container mx-auto flex justify-between p-6 bg-[#fdfdfc] rounded-3xl text-md">
          <Link to="/" className="w-48">
            <img src="/snapdata-logo.png" alt="Logo" className="h-16" />
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/explore">Explore</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="flex items-center justify-end w-48">
            <Link to="/" className="py-4 px-10 border-2 border-[#212121] rounded-3xl">Login</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

