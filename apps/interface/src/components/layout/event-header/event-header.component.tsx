import Link from "next/link";
import { FC, useEffect, useState } from "react"

export const EventHeaderComponent: FC = (): JSX.Element => {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (count < data.length - 1) {
                setCount(count + 1);
            } else {
                setCount(0)
            }
        }, 5000)
        return () => window.clearInterval(interval);
    })

    return (
        <Link href={data[count]?.href ?? '/'}>
            <div key={count} className="h-12 w-full bg-secondary-light shadow-md flex flex-row items-center justify-center cursor-pointer">
                <h3 id="event-header">"{data[count]?.title}"</h3>
            </div>
        </Link>
    )
}

const data = [
    {
        title: 'Naruto x Friends',
        href: '/charm/prod_NGRcVpNqjTfvAs',
    },
    {
        title: 'Interdimentional x Adventures',
        href: '/charm/prod_NGRZlKcvkEboQr',
    }]