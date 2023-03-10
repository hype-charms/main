import { GetServerSideProps } from "next"
import { useEffect } from "react";
import { SubState } from "../../models";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { type, index } = query;
    if (typeof type === "string" && JSON.parse(type) == "verify") {
        const data = await fetch(`${process.env.CLIENT_URL}/api/email`, {
            method: "PUT",
            body: JSON.stringify({ email: index }),
            headers: { "content-type": "application/json" },
        }).then(data => data.json())
        return { props: { data } }
    } else {
        return { props: { data: null } }
    }
}
interface EmaiListProps {
    data?: { result: SubState };
}
// TODO - move to server route
export default function EmailListComponent({ data }: EmaiListProps) {
    useEffect(() => {
        if (data) {
            window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_URL}?verified=${data.result}`
        } else {
            window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_URL}?verified=${SubState.NOT_FOUND}`
        }
    }, [])

    return <></>
}
