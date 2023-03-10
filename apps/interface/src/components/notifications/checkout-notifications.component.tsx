import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useNotificationContext } from "../../context/notification.context";

export interface CheckoutNotificationProps {
    status?: string
}
export const CheckoutNotificationComponent: FC<CheckoutNotificationProps> = ({ status }) => {
    const notificationContext = useNotificationContext();
    const router = useRouter();
    useEffect(() => {
        // timeout needed to ensure everything is loaded before dispatch 
        if (typeof status === "string") {
            switch (JSON.parse(status!)) {
                case "success":
                    router.push('/')
                    setTimeout(() => notificationContext?.addNotification({ text: "Purchase complete, you will receive an email shortly", id: "8" }), 1000)
                    break;
            }
        }
    }, [status])
    return <>
    </>
}