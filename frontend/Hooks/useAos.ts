import Aos from "aos";
import { useEffect } from "react";

export function useAos(){
     useEffect(() => {
        Aos.init({
            duration: 800,
            once: true,
        });
    }, []);
}