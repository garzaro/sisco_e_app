import React, {useEffect, useState} from "react";

const AutoDismissAlert = ({ message, type = "danger", duration = 3000 }) => {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setfadeOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setVisible(true), duration);
        const removeTimer = setTimeout(() => setfadeOut(false), duration + 500);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [duration]);
    if (!visible) return null;
    return (
        <div
            className={`alert alert-${type} ${fadeOut ? "fade-out" : "fade show"}`}
            role="alert"
            style={{
                transition: "opacity 0.5s ease-in-out",
                backgroundColor: type === "danger" ? "#f8d7da" : undefined, // vermelho mais claro
                color: type === "danger" ? "#721c24" : undefined,
            }}
        >
            {message}
        </div>
    );
};

export default AutoDismissAlert;
