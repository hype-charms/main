import { NotificationReference } from "@hype-charms/types";
import React, { createContext, FC, useContext, useState } from "react";
import { NotificationModalComponent } from "../components";
import styled from "styled-components";

interface NotificationContextProps {
    addNotification: (notification: NotificationReference) => void,
    removeNotification: (notification: NotificationReference) => void,
    notifications: NotificationReference[],
}

export const NotificationContext = createContext<NotificationContextProps | null>(null);

export const NotificationProvider: FC<{ children: JSX.Element, exitButtonSource: string }> = ({ children, exitButtonSource }) => {
    const [notifications, setNotifications] = useState<NotificationReference[]>([]);

    const addNotification = (notification: NotificationReference) => {
        setNotifications((notifications) => [...notifications, notification]);
    };

    const removeNotification = (notification: NotificationReference) => {
        setNotifications((notifications) => notifications.filter((n) => n.id !== notification.id));
    };

    return (
        <NotificationContext.Provider value={{ addNotification, removeNotification, notifications }}>
            {children}
            {notifications &&
                <NotificationWrapper>
                    {notifications.map((notification: NotificationReference) => (
                        <NotificationModalComponent
                            exitIconSrc={exitButtonSource}
                            key={notification.id}
                            width={500}
                            time={5000}
                            notificationRef={notification}
                        />
                    ))}
                </NotificationWrapper>
            }

        </NotificationContext.Provider>
    );
};

export const NotificationWrapper = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    z-index: 50;
    gap: 6px;
    position: fixed;
    bottom: 12px;
    left: 12px;
`

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("useNotificationContext must be used within a NotificationProvider");
    }

    return context;
};
