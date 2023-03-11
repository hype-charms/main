import { StripeItemReference } from "@hype-charms/types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "..";
import { NotificationReference, SearchReference } from "../../models";
import { ProductCategories } from "../../models/product.model";
import * as appActions from '../actions/application.actions'

export function useNavigateToProduct(): (id?: string) => void {
    const router = useRouter();
    return useCallback((id) => {
        if (id) {
            router.push(`/product/${id}`)
        }
    }, [router])
}

export function useLoadAppSearchReferences(): (items: StripeItemReference[]) => void {
    const dispatch = useDispatch();
    return useCallback((items) => {
        const categories = Object.values(ProductCategories).map(x => ({ type: 'category', id: x, value: x }));
        const searchRef: SearchReference[] = items.map(x => ({ type: x.type, id: x.id, value: x.name }))
        dispatch(appActions.loadSearchReferences([...searchRef, ...categories]))
    }, [])
}

export function useNotificationReferenceManager() {
    const dispatch = useDispatch();
    const notifications = useAppSelector((state) => state.applicationReducer.notifications);
    const notificationsRef = useRef<NotificationReference[] | null>([]);

    useEffect(() => {
        notificationsRef.current = notifications ?? [];
    }, [notifications]);

    const addNotification = useCallback((notification: NotificationReference) => {
        if (notificationsRef.current && notificationsRef.current.some(ref => ref.id !== notification.id)) {
            const updatedNotifications = [...notificationsRef.current, notification];
            notificationsRef.current = updatedNotifications;
            dispatch(appActions.setNotifications(updatedNotifications));
        } else {
            const updatedNotifications = [notification];
            notificationsRef.current = updatedNotifications;
            dispatch(appActions.setNotifications(updatedNotifications));
        }
    }, [notificationsRef, dispatch]);

    const removeNotification = useCallback((notification: NotificationReference) => {
        if (notificationsRef?.current && notificationsRef.current.length > 1) {
            const updatedNotifications = notificationsRef.current.filter((x) => x !== notification);
            notificationsRef.current = updatedNotifications;
            dispatch(appActions.setNotifications(updatedNotifications));
        } else {
            notificationsRef.current = null;
            dispatch(appActions.setNotifications(null));
        }
    }, [notificationsRef, dispatch]);

    return { notifications: notificationsRef.current, addNotification, removeNotification } as const;
}
