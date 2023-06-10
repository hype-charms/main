import { useRouter } from "next/router";
import { useCallback } from "react"

export const useHeaderControls = () => {
    const router = useRouter();
    const handleCartClick = useCallback(() => {
        console.log('clicked')
        router.push('/checkout');
    }, [router]);
    const handleProfileClick = useCallback(() => {
        router.push('/checkout')
    }, [router]);

    return { handleCartClick, handleProfileClick };
}