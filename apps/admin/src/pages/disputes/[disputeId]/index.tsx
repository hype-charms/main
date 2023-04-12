import { disputes } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { DashboardContainer } from "../../../components/dashboard/containers/dashboard.container";
import { DisputePageDetail } from "../../../components/dashboard/details/dispute-page-detail";
import { Layout } from "../../../components/layout/layout-component";
import { Loader } from "../../../components/layout/loader/loader.component";
import { getServerAuthSession } from "../../../server/utils/get-server-auth-session";
import { client, useLoadContext } from "../../_app";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    if (session) {
        if (typeof ctx.query.disputeId !== "string") {
            throw new Error('attempted to send query params as array or undefined')
        }
        const dispute_data = await client.disputes.retrieveDisputesById.query([ctx.query.disputeId]);
        return { props: { dispute_data } }
    } else {
        return { props: {} }
    }
}
interface DisputeDetailPageProps {
    dispute_data: disputes[] | null;
}
const DisputeDetailPage: NextPage<DisputeDetailPageProps> = ({ dispute_data }) => {
    const loading = useLoadContext();
    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <Layout location="Disputes">
                <DashboardContainer templateColumns={{ sm: '1fr' }} maxHeight="800px">
                    <DisputePageDetail data={dispute_data} />
                </DashboardContainer>
            </Layout>
        );
    }
}

export default DisputeDetailPage;