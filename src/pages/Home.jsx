import React from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/Messages")}>Go to Messages</button>
            <button onClick={() => navigate("/Timers")}>Go to Timers</button>
        </div>

    )
}

export default Home;