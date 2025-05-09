import type { NextApiRequest, NextApiResponse } from "next";
import { turso } from "nets/lib/turso";
import { Row } from "@libsql/client";

type Data = {
  result: Row[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { name } = req.query;

  const result = await turso.execute(
    "SELECT * FROM players WHERE name LIKE '%' || ? || '%' COLLATE NOCASE",
    [name as string]
  );

  const all = result.rows as Row[];
  
  res.status(200).json({
    result: all,
  });
}
