import { Link } from "react-router-dom";

const OraclesListItem = ({ oracle }: any) => {
  return (
    <Link to={`/oracles/${oracle.id}`}>
      <li>
        <h2>{oracle.name}</h2>
        <p>{oracle.description}</p>
      </li>
    </Link>
  );
}

export const OraclesList = () => {
  const oracles = [{
    id: "1",
    name: "Oracle 1",
    description: "This is the first oracle",
    walrusId: "1",
    data: {},
  },
  {
    id: "2",
    name: "Oracle 2",
    description: "This is the first oracle",
    walrusId: "2",
    data: {},
  },
  {
    id: "3",
    name: "Oracle 3",
    description: "This is the first oracle",
    walrusId: "3",
    data: {},
  }]

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