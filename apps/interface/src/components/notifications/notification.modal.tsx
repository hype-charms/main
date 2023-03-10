import Image from "next/image";
import { FC, useEffect, useState } from "react"
import { useNotificationContext } from "../../context/notification.context";
import { NotificationReference } from "../../models";

export interface NotificationModalProps {
    width: number;
    time: number;
    notificationRef: NotificationReference;
}
export const NotificationModalComponent: FC<NotificationModalProps> = ({ width, time, notificationRef }) => {

    const [borderWidth, setBorderWidth] = useState<number>(0);
    const [animation, setAnimation] = useState<string>("slide-up");
    const notificationContext = useNotificationContext();
    useEffect(() => setBorderWidth(0), [])

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setAnimation("fade-out")
            notificationContext?.removeNotification(notificationRef)
        }, time);
        return () => window.clearTimeout(timeout);
    }, [])

    useEffect(() => {
        const interval = window.setInterval(() => {
            setBorderWidth((prevBorderWidth) => prevBorderWidth + (width / time * 15));
        }, 1);
        return () => window.clearInterval(interval)
    }, [])

    const onCloseModal = () => {
        setAnimation("fade-out")
        setTimeout(() => notificationContext?.removeNotification(notificationRef), 100)
    }

    return (
        <div id={animation} className="bg-accent-one h-20 overflow-clip px-3" style={{ width: `${width}px` }}>
            <div className="absolute h-full border-b-4 border-b-primary" style={{ width: `${width - (borderWidth)}px` }}>
            </div>
            <div className="w-full h-full flex flex-row items-center justify-between px-2 bg-opacity-0">
                <p className="text-primary">{notificationRef.text}</p>
                <button
                    onClick={onCloseModal}
                    className="flex flex-col justify-start h-full py-3">
                    <Image src="/white-eye.svg" alt="" height={15} width={15} />
                </button>
            </div>
        </div>
    )
}

interface ModalTextChildProps {
    text: string
}
export const ModalTextChildComponent: FC<ModalTextChildProps> = ({ text }) => {
    return (
        <h3 className="text-primary">{text}</h3>
    )
}