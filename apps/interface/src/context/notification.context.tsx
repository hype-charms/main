import { createContext, FC, useContext, useEffect, useState } from "react";
import { useNotificationReferenceManager } from "../+state/hooks";
import { NotificationModalComponent } from "../components/notifications/notification.modal";
import { NotificationReference } from "../models";

interface NotificationContextProps {
    addNotification: (notification: NotificationReference) => void,
    removeNotification: (notification: NotificationReference) => void
}
export const NotificationContext = createContext<NotificationContextProps | null>(null)
export const NotificationProvider: FC<{ children: JSX.Element }> = ({ children }) => {

    const { notifications, addNotification, removeNotification } = useNotificationReferenceManager();
    const [elements, setElements] = useState<JSX.Element[] | null>();

    useEffect(() => setElements(notifications?.map((notification, idx) => <NotificationModalComponent
        key={idx}
        width={300}
        time={6000}
        notificationRef={notification}
    />)), [notifications])

    return <NotificationContext.Provider value={{ addNotification, removeNotification }}>
        <>
            {children}
            {elements && <div className="flex flex-col-reverse justify-center z-50 gap-6 fixed bottom-12 left-12">
                {elements?.map((ele, i) => <span key={i}>{ele}</span>)}
            </div>}
        </>
    </NotificationContext.Provider>
}
export const useNotificationContext = () => {
    return useContext(NotificationContext)
} 
