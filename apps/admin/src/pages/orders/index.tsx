import { order_list } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { DashboardContainer } from "../../components/dashboard/containers/dashboard.container";
import { OrderListDetail } from "../../components/dashboard/details/order-list.detail";
import { OrderListComponent } from "../../components/dashboard/widgets/order-list.widget";
import { Layout } from "../../components/layout/layout-component";
import { Loader } from "../../components/layout/loader/loader.component";
import { getServerAuthSession } from "../../server/utils/get-server-auth-session";
import { client, useLoadContext } from "../_app";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    if (session) {
        const order_data = await client.orders.retrieveOrder.query();
        return { props: { order_data } }
    } else {
        return { props: {} }
    }
}
interface OrdersPageProps {
    order_data: order_list[] | null;
}
const OrdersPage: NextPage<OrdersPageProps> = ({ order_data }) => {
    const loading = useLoadContext();
    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <Layout location="orders">
                <DashboardContainer templateColumns={{ sm: '1fr 1fr' }} maxHeight="800px">
                    <OrderListComponent data={order_data} />
                    <OrderListDetail data={order_data} />
                </DashboardContainer>
            </Layout>
        );
    }
}

export default OrdersPage;