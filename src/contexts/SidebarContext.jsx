import React, { createContext, useState, useEffect, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    // Sidebar size states
    const [sidebarSize, setSidebarSize] = useState('lg');

    const colors = ['default', 'dark', 'primary', 'gradient'];
    const [sidebarColor, setSidebarColor] = useState('default');

    // Apply sidebar states to body
    useEffect(() => {
        const bodyElement = document.body;

        // Set sidebar size
        if (sidebarSize) {
            bodyElement.setAttribute("data-sidebar", sidebarSize);
        } else {
            bodyElement.removeAttribute("data-sidebar");
        }

        // Set sidebar color
        if (sidebarColor) {
            bodyElement.setAttribute("data-sidebar-color", sidebarColor);
        } else {
            bodyElement.removeAttribute("data-sidebar-color");
        }
    }, [sidebarSize, sidebarColor]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1600) {
                setSidebarSize('sm');
            } else {
                setSidebarSize('lg');
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Toggle between small and large sidebar
    const toggleSidebar = () => {
        setSidebarSize(prevSize => prevSize === 'sm' ? 'lg' : 'sm');
    };

    // Function to change sidebar color
    const changeSidebarColor = (color) => {
        if (colors.includes(color)) {
            setSidebarColor(color);
        }
    };

    return (
        <SidebarContext.Provider value={{
            sidebarSize,
            sidebarColor,
            colors,
            toggleSidebar,
            changeSidebarColor,
            setSidebarSize,
            setSidebarColor
        }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Custom hook to use the sidebar context
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

export default SidebarContext;
