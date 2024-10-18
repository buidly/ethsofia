import { NavBar } from "../../components";

export const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="container m-auto p-6 flex flex-col gap-6">
        <div className="flex items-center justify-center">
          <img src="/snapdata-logo.png" alt="Logo" className="h-80 w-auto" />
        </div>
        <h1 className="text-3xl my-12">
          data
        </h1>
      </div>
    </>
  );
}