import React, { useEffect, useState } from "react";

const AutoDismissAlert = ({ message, type = "danger", duration = 2000 }) => {
    const [visible, setVisible] = useState(true);
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        // Sempre que a message mudar, reinicia tudo
        setVisible(true);
        setFadingOut(false);

        const fadeTimer = setTimeout(() => setFadingOut(true), duration);
        const removeTimer = setTimeout(() => setVisible(false), duration + 500);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, [message, duration]);

    if (!visible) return null;

    return (
        <div
            className={`alert alert-${type}`}
            role="alert"
            style={{
                opacity: fadingOut ? 0 : 1,
                transition: "opacity 0.5s ease-in-out",
                backgroundColor: type === "danger" ? "#f8d7da" : undefined,
                color: type === "danger" ? "#721c24" : undefined,
            }}
        >
            {message}
        </div>
    );
};

export default AutoDismissAlert;
