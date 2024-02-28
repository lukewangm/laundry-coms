import React from "react";
import {useNavigate} from "react-router-dom";

function Timers() {
    const navigate = useNavigate();
    return (
        <div>
            Hello
            <button onClick={() => navigate("/LoginPage")}>Go to Login</button>
        </div>

    )
}

export default Timers;