import { FC, useEffect } from "react";
import { useNotificationContext } from "../../context/notification.context";
import { SubState } from "../../models";

export interface EmailListNotificationProps {
    subStatus?: SubState
}
export const EmailListNotificationComponent: FC<EmailListNotificationProps> = ({ subStatus }) => {
    const notificationContext = useNotificationContext();
    useEffect(() => {
        // timeout needed to ensure everything is loaded before dispatch 
        switch (subStatus) {
            case SubState.USER_VERIFIED:
                setTimeout(() => notificationContext?.addNotification({ text: "Your promo code will be available at the checkout", id: "5" }), 1000)
                break;
        }
    }, [subStatus, notificationContext, ])
    return <>
    </>
}