import { useEffect, useRef } from 'react';

const useAnimatedSvg = (animationPath, options = {}) => {
    const animationRef = useRef(null);
    const animInstance = useRef(null);

    useEffect(() => {
        // Store the ref value in a variable
        const animationElement = animationRef.current;
        
        const initAnimation = () => {
            if (!animationElement || !window.lottie) return;
            
            // Destroy existing animation if it exists
            animInstance.current?.destroy();
            animationElement.innerHTML = "";

            // Initialize new animation with provided options
            animInstance.current = window.lottie.loadAnimation({
                container: animationElement,
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: animationPath,
                ...options
            });
        };

        // Check if Lottie script is already loaded
        const existingScript = document.querySelector('script[data-lottie="true"]');
        
        if (existingScript) {
            if (window.lottie) {
                initAnimation();
            } else {
                existingScript.addEventListener("load", initAnimation, { once: true });
            }
        } else {
            // Load Lottie script if not already loaded
            const script = document.createElement("script");
            script.src = "/lottie.min.js";
            script.setAttribute("data-lottie", "true");
            script.onload = initAnimation;
            document.body.appendChild(script);
        }

        // Cleanup function
        return () => {
            animInstance.current?.destroy();
            if (animationElement) {
                animationElement.innerHTML = "";
            }
        };
    }, [animationPath, options]);

    return animationRef;
};

export default useAnimatedSvg;