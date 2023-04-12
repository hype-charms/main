import { inventory } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { DashboardContainer } from "../../components/dashboard/containers/dashboard.container";
import { InventoryListWidget } from "../../components/dashboard/widgets/inventory.widget";
import { Layout } from "../../components/layout/layout-component";
import { Loader } from "../../components/layout/loader/loader.component";
import { getServerAuthSession } from "../../server/utils/get-server-auth-session";
import { client, useLoadContext } from "../_app";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    if (session) {
        const inventory_data = await client.inventory.retrieveInventory.query();
        return { props: { inventory_data } }
    } else {
        return { props: {} }
    }
}
interface OrdersPageProps {
    inventory_data: inventory[] | null;
}
const OrdersPage: NextPage<OrdersPageProps> = ({ inventory_data }) => {
    const loading = useLoadContext();
    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <Layout location="orders">
                <DashboardContainer templateColumns={{ sm: '1fr' }} maxHeight="800px">
                    <InventoryListWidget data={inventory_data} />
                </DashboardContainer>
            </Layout>
        );
    }
}

export default OrdersPage;