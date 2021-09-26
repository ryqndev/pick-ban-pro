import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            dashboard
            <Link to="/list/teams">teams</Link>
            <br />
            <Link to="/list/teams/funplus-phoenix">fpx</Link>
            <br />

            <Link to="/list/tournaments">tournaments</Link>
            <br />

            <Link to="/list/tournaments/msi-2021">msi 2021</Link>
            <br />
        </div>
    );
}

export default Dashboard;
