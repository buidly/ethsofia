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
            <Link to="#">About</Link>
            <Link to="#">Docs</Link>
          </div>
          <div className="flex items-center justify-end w-48">
            <img src="https://avatar.iran.liara.run/public/17" className="border-2 border-[#212121] rounded-full w-12 h-12 object-cover"></img>
          </div>
        </div>
      </nav>
    </div>
  );
}

