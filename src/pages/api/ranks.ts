import type { NextApiRequest, NextApiResponse } from "next";
import { turso } from "nets/lib/turso";
import { Row } from "@libsql/client";

type Data = {
  top10: Row[];
  top20: Row[];
  top50: Row[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const allRanks = await turso.execute(
    "SELECT * FROM players WHERE rank BETWEEN 1 AND 50 ORDER BY rank ASC"
  );
  
  const all = allRanks.rows as Row[];
  
  res.status(200).json({
    top10: all.slice(0, 10),
    top20: all.slice(10, 20),
    top50: all.slice(20, 50),
  });
}
