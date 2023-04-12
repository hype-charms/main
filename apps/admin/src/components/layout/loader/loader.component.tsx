import { Container } from "@mui/system"
import { useEffect, useState } from "react";
import { DashboardContainer } from "../../dashboard/containers/dashboard.container"
import { Layout } from "../layout-component"

export const Loader = () => {

    const [count, setcount] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (count === 2) {
                setcount(0)
            } else {
                setcount(count + 1);
            }
        }, 300);
        return () => window.clearInterval(interval)
    })
    return (
        <Layout location="">
            <DashboardContainer templateColumns={{ sm: '1fr' }} maxHeight="100%">
                <Container sx={{
                    height: '60vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    transform: 'translateX(-4rem)'
                }}>
                    <div id="fade-in" key={count + 'a'} className={` ${count === 0 ? "scale-100" : "scale-0"}  filter h-6 w-6 bg-[#202020] shadow-black shadow rounded-3xl`} />
                    <div id="fade-in" key={count + 'b'} className={` ${count === 1 ? "scale-100" : "scale-0"}  filter h-6 w-6 bg-[#202020] shadow-black shadow rounded-3xl`} />
                    <div id="fade-in" key={count + 'c'} className={` ${count === 2 ? "scale-100" : "scale-0"}  filter h-6 w-6 bg-[#202020] shadow-black shadow rounded-3xl`} />
                </Container>
            </DashboardContainer>
        </Layout>
    )
}