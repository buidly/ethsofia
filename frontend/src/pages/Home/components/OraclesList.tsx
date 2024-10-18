import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils";
import { Oracle } from "../../../utils/types";

const OraclesListItem = ({ oracle }: { oracle: Oracle }) => {
  return (
    <Link to={`/oracles/${oracle.id}`}>
      <li>
        <h2>{oracle.title}</h2>
        <p>{oracle.description}</p>
      </li>
    </Link>
  );
}

export const OraclesList = () => {
  const [oracles, setOracles] = useState<Oracle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOracles = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/oracles`);
        setOracles(response.data);
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!oracles.length) {
    return (
      <div>
        <h1>Oracles List</h1>
        <p>No oracles found</p>
        <Link to="/oracles/new">Create a new oracle</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Oracles List</h1>
      <ul>
        {oracles.map(oracle => (
          <OraclesListItem oracle={oracle} key={oracle.id} />
        ))}
      </ul>
    </div>
  );
};