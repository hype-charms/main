import { Redis } from "ioredis"

export * from "./product"

export const client = new Redis({
    port: parseInt(process.env.REDIS_PORT!),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
})

export const serializeProductData = (data: any) => {
    return Promise.all(data.map(async (id: string) => {
        const response = await client.get(id)
        return response ? JSON.parse(response) : null;
    }))
}

export namespace cache {
    /**
     * Used to disconnect from redis once all actions have been executed 
     */
    export const disconnect = async () => {
        if (client.status === "ready") {
            client.disconnect();
        }
    }
}