import React, { createContext, useState, useEffect, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [sidebarSize, setSidebarSize] = useState('lg');
    const colors = ['default', 'dark', 'primary', 'gradient'];
    const [sidebarColor, setSidebarColor] = useState('default');
    const [isInitialized, setIsInitialized] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('light');
    const [isManualSelection, setIsManualSelection] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            const theme = document.documentElement.getAttribute('data-bs-theme') || 'light';
            setCurrentTheme(theme);
            setSidebarColor(theme === 'dark' ? 'dark' : 'default');
            setIsInitialized(true);
        }
    }, [isInitialized]);

    // Monitor theme changes
    useEffect(() => {
        const updateTheme = () => {
            const theme = document.documentElement.getAttribute('data-bs-theme') || 'light';
            const prevTheme = currentTheme;
            setCurrentTheme(theme);

            // 🔥 Theme change detected - reset manual selection flag
            if (prevTheme !== theme) {
                setIsManualSelection(false);

                // Auto-sync with new theme
                if (theme === 'light') {
                    setSidebarColor('default');
                } else if (theme === 'dark') {
                    setSidebarColor('dark');
                }
            }
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-bs-theme']
        });

        return () => observer.disconnect();
    }, [currentTheme]);

    // Apply sidebar states to body
    useEffect(() => {
        const bodyElement = document.body;

        if (sidebarSize) {
            bodyElement.setAttribute("data-sidebar", sidebarSize);
        } else {
            bodyElement.removeAttribute("data-sidebar");
        }

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

    const toggleSidebar = () => {
        setSidebarSize(prevSize => prevSize === 'sm' ? 'lg' : 'sm');
    };

    // Change sidebar color with manual selection tracking
    const changeSidebarColor = (color) => {
        if (isColorDisabled(color)) {
            return;
        }

        if (colors.includes(color)) {
            setSidebarColor(color);
            setIsManualSelection(true); // Mark as manual selection
        }
    };

    // Check if a color is disabled
    const isColorDisabled = (color) => {
        return currentTheme === 'dark' && color === 'default';
    };
    const closeSidebarOnMobile = () => {
        if (window.innerWidth < 992) {   // breakpoint: adjust if needed
            setSidebarSize('sm');
        }
    };

    return (
        <SidebarContext.Provider value={{
            sidebarSize,
            sidebarColor,
            colors,
            currentTheme,
            toggleSidebar,
            changeSidebarColor,
            isColorDisabled,
            setSidebarSize,
            setSidebarColor,
            closeSidebarOnMobile,
        }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

export default SidebarContext;