import Layout from "nets/components/Layout";
import Image from "next/image";

const MatchesPage = () => {
  return (
    <Layout title="Matches">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-full p-12">
          <Image src="/info.webp" width={267} height={228} alt="INFO" />
          <div className="font-medium text-base uppercase leading-5 text-center w-full">
            coming soon
          </div>
          <div className="text-xs leading-5 text-center">
            We’re building a new page packed with curated merchants, exclusive deals, and limited‑time promos just for you. Stay tuned !
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default MatchesPage;