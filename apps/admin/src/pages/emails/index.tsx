import { email_dto } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { DashboardContainer } from "../../components/dashboard/containers/dashboard.container";
import { EmailDetailComponent } from "../../components/dashboard/details/email-list.detail";
import { EmailListWidget } from "../../components/dashboard/widgets/email-list.widget";
import { Layout } from "../../components/layout/layout-component";
import { Loader } from "../../components/layout/loader/loader.component";
import { getServerAuthSession } from "../../server/utils/get-server-auth-session";
import { client, useLoadContext } from "../_app";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    if (session) {
        const email_data = await client.emails.retrieveEmails.query();
        return { props: { email_data } }
    } else {
        return { props: {} }
    }
}
interface EmailsPageProps {
    data: email_dto[] | null;
}
const EmailsPage: NextPage<EmailsPageProps> = ({ data }) => {
    const loading = useLoadContext();
    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <Layout location="emails">
                <DashboardContainer templateColumns={{ sm: '1fr 1fr' }}>
                    <EmailListWidget data={data} />
                    <EmailDetailComponent data={data} />
                </DashboardContainer>
            </Layout>
        );
    }
}

export default EmailsPage;