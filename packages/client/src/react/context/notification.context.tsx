import { NotificationReference } from "@hype-charms/types";
import React, { createContext, FC, useContext, useEffect, useState } from "react";
import { NotificationModalComponent } from "../components";

interface NotificationContextProps {
    addNotification: (notification: NotificationReference) => void,
    removeNotification: (notification: NotificationReference) => void,
    notifications: NotificationReference[]
}

export const NotificationContext = createContext<NotificationContextProps | null>(null);

export const NotificationProvider: FC<{ children: JSX.Element }> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationReference[]>([]);

    const addNotification = (notification: NotificationReference) => {
        setNotifications((notifications) => [...notifications, notification]);
    };

    const removeNotification = (notification: NotificationReference) => {
        setNotifications((notifications) => notifications.filter((n) => n.id !== notification.id));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setNotifications((notifications) => notifications.filter((n) => !n.id));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification, removeNotification, notifications }}>
            {children}
            {notifications &&
        notifications.map((notification: NotificationReference) => (
          <NotificationModalComponent
            key={notification.id}
            width={500}
            time={5000}
            notificationRef={notification}
          />
        ))}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("useNotificationContext must be used within a NotificationProvider");
    }

    return context;
};
