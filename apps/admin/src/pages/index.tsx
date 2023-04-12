/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GetServerSideProps, NextPage } from "next";
import { DashboardContainer } from "../components/dashboard/containers/dashboard.container";
import { Layout } from "../components/layout/layout-component";
import { OrderListComponent } from "../components/dashboard/widgets/order-list.widget";
import { InventoryListWidget } from "../components/dashboard/widgets/inventory.widget";
import { PieChartWidget } from "../components/dashboard/widgets/pie-chart.widget";
import { EmailListWidget } from "../components/dashboard/widgets/email-list.widget";
import { client, useLoadContext } from "./_app";
import { getServerAuthSession } from "../server/utils/get-server-auth-session";
import { disputes, email_dto, inventory, order_list } from "@prisma/client";
import { DisputeListWidget } from "../components/dashboard/widgets/dispute-list.widget";
import { Loader } from "../components/layout/loader/loader.component";

interface HomePageProps {
  email_data: email_dto[] | null
  order_data: order_list[] | null;
  inventory: inventory[] | null;
  disputes_data: disputes[] | null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (session) {
    const email_data = await client.emails.retrieveEmails.query();
    const order_data = await client.orders.retrieveOrder.query();
    const inventory = await client.inventory.retrieveInventory.query();
    const disputes_data = await client.disputes.retrieveDisputes.query();
    return { props: { email_data, order_data, inventory, disputes_data } }
  } else {
    return { props: {} }
  }
}
const HomePage: NextPage<HomePageProps> = ({ email_data, order_data, inventory, disputes_data }) => {
  const loading = useLoadContext();
  if (loading) {
    return (
      <Loader />
    )
  } else {
    return (
      <Layout location="dashboard">
        <DashboardContainer templateColumns={{ sm: '1fr 1fr' }} maxHeight="400px">
          <InventoryListWidget data={inventory} />
          <PieChartWidget data={[{ argument: 1, value: 10 },
          { argument: 2, value: 20 },
          { argument: 3, value: 30 }]} />
        </DashboardContainer>
        <DashboardContainer templateColumns={{ md: '1fr' }} maxHeight="300px">
          <OrderListComponent data={order_data} />
        </DashboardContainer>
        <DashboardContainer templateColumns={{ md: '1fr' }} maxHeight="300px">
          <EmailListWidget data={email_data} />
        </DashboardContainer>
        <DashboardContainer templateColumns={{ md: '1fr' }} maxHeight="300px">
          <DisputeListWidget data={disputes_data} />
        </DashboardContainer>
      </Layout>
    );
  }
}

export default HomePage

