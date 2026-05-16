import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    
    const [mounted, setMounted] = useState(false);
    const styleId = "theme-transition-styles";

    // ---- animation helpers ----
    const getPositionCoords = (position) => {
        switch (position) {
            case "top-left": return { cx: "0", cy: "0" }
            case "top-right": return { cx: "40", cy: "0" }
            case "bottom-left": return { cx: "0", cy: "40" }
            case "bottom-right": return { cx: "40", cy: "40" }
            default: return null
        }
    }

    const generateSVG = (variant, start) => {
        if (start === "center") return ""
        
        // Linear gradient variants for smooth left-to-right or right-to-left
        if (variant === "rectangle-left") {
            return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad-left" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:black;stop-opacity:1" /><stop offset="100%" style="stop-color:black;stop-opacity:1" /></linearGradient></defs><rect x="0" y="0" width="100" height="100" fill="url(%23grad-left)"/></svg>`
        }
        if (variant === "rectangle-right") {
            return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad-right" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" style="stop-color:black;stop-opacity:1" /><stop offset="100%" style="stop-color:black;stop-opacity:1" /></linearGradient></defs><rect x="0" y="0" width="100" height="100" fill="url(%23grad-right)"/></svg>`
        }
        
        // Circle variants
        const pos = getPositionCoords(start)
        if (!pos) return ""
        const { cx, cy } = pos
        if (variant === "circle") {
            return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="black"/></svg>`
        }
        if (variant === "circle-blur") {
            return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="black" filter="url(%23blur)"/></svg>`
        }
        return ""
    }

    const getTransformOrigin = (start, end) => {
        switch (start) {
            case "top-left": return "top left"
            case "top-right": return "top right"
            case "bottom-left": return "bottom left"
            case "bottom-right": return "bottom right"
            default: return "center"
        }
    }

    const createAnimation = (variant, start, end, url = "") => {
        const svg = generateSVG(variant, start)
        
        // Rectangle animations with linear slide
        if (variant === "rectangle-left") {
            return {
                name: 'rectangle-left',
                css: `
                    ::view-transition-group(root) {
                        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    ::view-transition-new(root) {
                        mask: linear-gradient(to right, black 0%, black 100%);
                        mask-size: 0% 100%;
                        mask-position: left center;
                        mask-repeat: no-repeat;
                        animation: slideFromLeft 0.6s ease-out both;
                    }
                    ::view-transition-old(root) {
                        animation: slideFromLeft 0.6s ease-out both;
                        z-index: -1;
                    }
                    @keyframes slideFromLeft {
                        from {
                            mask-size: 0% 100%;
                        }
                        to {
                            mask-size: 100% 100%;
                        }
                    }
                `,
            }
        }
        
        if (variant === "rectangle-right") {
            return {
                name: 'rectangle-right',
                css: `
                    ::view-transition-group(root) {
                        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    ::view-transition-new(root) {
                        mask: linear-gradient(to left, black 0%, black 100%);
                        mask-size: 0% 100%;
                        mask-position: right center;
                        mask-repeat: no-repeat;
                        animation: slideFromRight 0.6s ease-out both;
                    }
                    ::view-transition-old(root) {
                        animation: slideFromRight 0.6s ease-out both;
                        z-index: -1;
                    }
                    @keyframes slideFromRight {
                        from {
                            mask-size: 0% 100%;
                        }
                        to {
                            mask-size: 100% 100%;
                        }
                    }
                `,
            }
        }
        
        // Circle animations (original)
        const transformOrigin = getTransformOrigin(start, end)
        return {
            name: `${variant}-${start}`,
            css: `
                ::view-transition-group(root) {
                    animation-timing-function: var(--expo-out);
                }
                ::view-transition-new(root) {
                    mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
                    animation: scale-${start} 1.2s both;
                    transform-origin: ${transformOrigin};
                }
                ::view-transition-old(root),
                .dark::view-transition-old(root) {
                    animation: scale-${start} 1.2s both;
                    transform-origin: ${transformOrigin};
                    z-index: -1;
                }
                @keyframes scale-${start} {
                    from {
                        mask-size: 0;
                    }
                    to {
                        mask-size: 350vmax;
                    }
                }
            `,
        }
    }

    const updateStyles = useCallback((css) => {
        let styleElement = document.getElementById(styleId)
        if (!styleElement) {
            styleElement = document.createElement("style")
            styleElement.id = styleId
            document.head.appendChild(styleElement)
        }
        styleElement.textContent = css
    }, [])

    // ---- initial theme setup ----
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        setMounted(true);
    }, []);

    useEffect(() => {
        // Apply theme to document
        if (mounted) {
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);

    const toggleTheme = (variant = "circle-blur", start = "top-left", end = "top-right", url = "") => {
        const animation = createAnimation(variant, start, end, url)
        updateStyles(animation.css)

        const switchTheme = () => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-bs-theme', newTheme);
        }

        if (!document.startViewTransition) {
            switchTheme()
            return
        }

        document.startViewTransition(switchTheme)
    }

    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;