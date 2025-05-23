"use client";

import React, { useState, createContext } from "react";

export const MezcalerasContext = React.createContext({
    mezcaleras: [],
    loadMimebros: () => {}
});

export const MezcalerasProvider = ({ children }) => {
    const [mezcaleras, setMezcaleras] = useState([]);

    async function loadMimebros() {
        const response = await fetch('api/members/' + true);
        const data = await response.json();
        setMezcaleras(data);
    }

    return (
        <MezcalerasContext.Provider value={{ mezcaleras, loadMimebros }}>
            {children}
        </MezcalerasContext.Provider>
    );
};
