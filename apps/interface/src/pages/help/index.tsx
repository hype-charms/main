import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { Layout } from "../../components/layout/layout.component";

interface HelpPageProps {}
export default function HelpPage() {
    return <Layout>
        <p>help</p>
    </Layout>
}