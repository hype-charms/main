import { inventory } from '@prisma/client'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Stripe from 'stripe'
import { useAppSelector } from '..'
import { Carriers } from '../../models/orders.model'
import { client } from '../../pages/_app'
import * as orderActions from '../actions/orders.actions'


export function useSetBulkSelectOrders(): [string[] | null, (orderId: string) => void] {
    const selected = useAppSelector(state => state.orderReducer.bulkSelection)
    const dispatch = useDispatch();
    return [selected, useCallback((orderId) => {
        dispatch(orderActions.setBulkOrdersSelection(orderId))
    }, [dispatch])]
}

export function useUpdateShippingStatus(): (order_ids: string[], status: "shipped" | "delivered" | "pending" | "failed") => Promise<void> {
    return useCallback(async (order_ids, status) => {
        await client.orders.upsertOrderStatus.mutate({ order_ids, shipping_status: status })
    }, [])
}

export function useUpdateShippingCarrier(): (order_ids: string[], carrier: Carriers) => Promise<void> {
    return useCallback(async (order_ids, carrier) => {
        await client.orders.updateOrderCarrier.mutate({ order_ids, carrier })
    }, [])
}

export function useUpdateShippingTrackingNumber(): (order_id: string, tracking_number: string) => Promise<void> {
    return useCallback(async (order_id, tracking_number) => {
        await client.orders.updateOrderTrackingNumber.mutate({ order_id, tracking_number })
    }, [])
}

export function useUpdateDisputes(): (dispute_id: string, dispute: Stripe.Dispute, disputed: boolean) => Promise<void> {
    return useCallback(async (dispute_id, dispute) => {
        await client.disputes.upsertDispute.mutate({ dispute_id, dispute })
    }, [])
}

export function useUpdateProductInventory(): (product_id: string, inventory: inventory) => void {
    return useCallback(async (product_id, inventory) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        await client.inventory.insertInventory.mutate({ product_id, inventory });
    }, [])
}

export function useUpdateCurrentStock(): (product_id: string, current_stock: number) => void {
    return useCallback(async (product_id, current_stock) => {
        await client.inventory.upsertCurrentStock.mutate({ product_id, current_stock });
    }, [])
}

export function useUpdateOrderedStock(): (product_id: string, ordered_stock: number) => void {
    return useCallback(async (product_id, ordered_stock) => {
        await client.inventory.upsertOrderedStock.mutate({ product_id, ordered_stock });
    }, [])
}