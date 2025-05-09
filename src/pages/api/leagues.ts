import type { NextApiRequest, NextApiResponse } from "next";
import { turso } from "nets/lib/turso";
import { Row } from "@libsql/client";

type Data = {
  league: Row[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const result = await turso.execute(`
    SELECT * FROM leagues l
    WHERE NOT EXISTS (
      SELECT 1 FROM player_league pl
      WHERE pl.league_id = l.id AND pl.player_id = 1
    )
  `);
  
  const all = result.rows as Row[];
  
  res.status(200).json({
    league: all,
  });
}
