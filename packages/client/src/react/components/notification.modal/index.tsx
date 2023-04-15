import Image from "next/image";
import React, { FC, useEffect, useState } from "react"
import { useNotificationContext } from "../../context/notification.context";
import { NotificationReference } from "@hype-charms/types";
import "../styles/globals.css"
import { Container, ExitButton, NotificationContent, Timer } from "./templates";
import { useThemeContext } from "../../context/theme.context";

export interface NotificationModalProps {
    width: number;
    time: number;
    notificationRef: NotificationReference;
    exitIconSrc: string;
}

export const NotificationModalComponent: FC<NotificationModalProps> = ({ width, time, notificationRef, exitIconSrc }) => {

    const [borderWidth, setBorderWidth] = useState<number>(0);
    const [animation, setAnimation] = useState<string>("slide-up");
    const notificationContext = useNotificationContext();

    const theme = useThemeContext();

    useEffect(() => setBorderWidth(0), [])

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setAnimation("fade-out")
            notificationContext?.removeNotification(notificationRef)
        }, time);
        return () => window.clearTimeout(timeout);
    }, [notificationContext, notificationRef, time])

    useEffect(() => {
        const interval = window.setInterval(() => {
            setBorderWidth((prevBorderWidth) => prevBorderWidth + (width / time * 15));
        }, 1);
        return () => window.clearInterval(interval)
    }, [notificationContext, notificationRef, time, width])

    const onCloseModal = () => {
        setAnimation("fade-out")
        setTimeout(() => notificationContext?.removeNotification(notificationRef), 100)
    }

    return (
        <Container theme={theme} id={animation} width={`${width}px`}>
            <Timer theme={theme} width={`${width - (borderWidth)}px`}>
            </Timer>
            <NotificationContent>
                <p>{notificationRef.text}</p>
                <ExitButton
                    type="button"
                    aria-label="closes the notification"
                    onClick={onCloseModal}>
                    <Image src={exitIconSrc} alt="" height={15} width={15} />
                </ExitButton>
            </NotificationContent>
        </Container>
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