import { Link } from "react-router-dom";
import { NavBar } from "../../components";
import { OraclesList } from "../Explore/components";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="container m-auto p-6 flex flex-col gap-12 justify-center">
        <div className="flex flex-col items-center text-center text-[#434343] gap-4">
          <img src="/snapdata-logo.png" alt="Logo" className="h-80 w-auto" />
          <h1 className="text-3xl mt-[-5rem]">Create your first snap today</h1>
          <p className="max-w-3xl font-normal">On-demand oracles, real-time data, trustless insights. SnapData brings the real world to your blockchain, one snap at a time. Ready to power your dApp? Start snapping now.</p>
        </div>
        <OraclesList isHomePage />
        <div>
          <div className="flex items-center justify-center">
            <Link to="/explore" className="p-4 px-6 border-2 border-[#212121] rounded-3xl">Explore more SNAPS</Link>
          </div>
        </div>
      </div>
    </>
  );
}