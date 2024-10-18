import { NavBar } from "../../components";
import { OraclesList } from "./components";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="container m-auto p-6">
        <h1>Home Page</h1>
        <p>Welcome to the home page</p>
        <OraclesList />
      </div>
    </>
  );
}