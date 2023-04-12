import { disputes } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { DashboardContainer } from "../../components/dashboard/containers/dashboard.container";
import { DisputesListDetail } from "../../components/dashboard/details/disputes-list-detail";
import { DisputeListWidget } from "../../components/dashboard/widgets/dispute-list.widget";
import { Layout } from "../../components/layout/layout-component";
import { Loader } from "../../components/layout/loader/loader.component";
import { getServerAuthSession } from "../../server/utils/get-server-auth-session";
import { client, useLoadContext } from "../_app";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    if (session) {
        const disputes_data = await client.disputes.retrieveDisputes.query();
        return { props: { disputes_data } }
    } else {
        return { props: {} }
    }
}
interface DisputePageProps {
    disputes_data: disputes[] | null;
}
const DisputePage: NextPage<DisputePageProps> = ({ disputes_data }) => {
    const loading = useLoadContext();
    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <Layout location="Disputes">
                <DashboardContainer templateColumns={{ sm: '1fr 1fr' }} maxHeight="800px">
                    <DisputeListWidget data={disputes_data} />
                    <DisputesListDetail data={disputes_data} />
                </DashboardContainer>
            </Layout>
        );
    }
}

export default DisputePage;