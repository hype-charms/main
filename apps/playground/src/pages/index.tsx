import type { NextPage } from "next";
import Head from "next/head";
import { useMobileContext, useNotificationContext, Test } from "@hype-charms/client"

const Home: NextPage = () => {

  const { addNotification } = useNotificationContext();
  const mobile = useMobileContext();

  function handleClick() {
    addNotification({ id: "1", text: "hello world!" });
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!mobile ? <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <button onClick={handleClick}>Add Notification</button>
        <Test />
      </main> : <div>Using mobile</div>}
    </>
  );
};

export default Home;
