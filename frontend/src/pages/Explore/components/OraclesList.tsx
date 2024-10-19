import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils";
import { Oracle } from "../../../utils/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpLong, faCircleNotch, faPlus, faSadTear } from '@fortawesome/free-solid-svg-icons'

const OraclesListItem = ({ oracle }: { oracle: Oracle }) => {
  const itemColors = [
    "#eff0a3",
    "#d8dfe9",
    "#cfdeca"
  ];
  const idSum = oracle._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = idSum % itemColors.length;
  const color = itemColors[colorIndex];

  return (
    <div className="p-10  rounded-3xl flex flex-row-reverse gap-6 justify-between" style={{ backgroundColor: color }}>
      <Link to={`/oracles/${oracle._id}`}>
        <FontAwesomeIcon icon={faArrowUpLong} className="h-6 w-6 rotate-45" />
      </Link>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">{oracle.title}</h2>
        <p className="font-normal">{oracle.description}</p>
        <br></br>
        <p className="text-xs font-normal break-all">{oracle.blobId ?? 'Not published yet'}</p>
      </div>
    </div >
  );
}

export const OraclesList = ({ isHomePage }: { isHomePage?: boolean }) => {
  const [oracles, setOracles] = useState<Oracle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOracles = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/oracles`);
        setOracles(response.data);

        if (isHomePage) {
          setOracles(response.data.slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching oracles", error);
        setError('Error fetching oracles');
      } finally {
        setLoading(false);
      }
    }
    fetchOracles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-col gap-4">
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin h-10 w-10" />
        <p>Loading..</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center flex-col gap-4">
        <FontAwesomeIcon icon={faSadTear} className="h-10 w-10" />
        <p>An error occurred</p>
      </div>
    )
  }

  if (!oracles.length) {
    return (
      <div className="flex items-center justify-center flex-col gap-4">
        <p>There are no oracles yet. Feel free to create one!</p>
        <Link to="/oracles/new" className="p-4 border-2 border-[#212121] rounded-3xl">Create a new oracle</Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {oracles.map(oracle => (
        <OraclesListItem oracle={oracle} key={oracle._id} />
      ))}
      {!isHomePage && (
        <div className="p-10  rounded-3xl flex flex-row-reverse gap-6 justify-between bg-[#fdfdfc]">
          <Link to={`/oracles/new`}>
            <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
          </Link>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl">Create new oracle</h2>
            <p className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div >
      )}
    </div >
  );
};