"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Desabilita Lenis em dispositivos touch / telas pequenas
        // (causa lag perceptível em mobile e atrapalha scroll nativo)
        const isTouch =
            typeof window !== "undefined" &&
            (window.matchMedia("(hover: none)").matches ||
                window.matchMedia("(max-width: 1024px)").matches ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches);

        if (isTouch) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
