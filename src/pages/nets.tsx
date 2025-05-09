import Layout from "nets/components/Layout";
import Image from "next/image";

const LeaguePage = () => {
  return (
    <Layout title="About NETS">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-full p-12">
          <Image src={'/logo.webp'} title="NETS" alt="NETS" width={135} height={37} />
          <div className="text-xs leading-5 text-center pt-2">
            We’re building a new page packed with curated merchants, exclusive deals, and limited‑time promos just for you. Stay tuned !
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default LeaguePage;