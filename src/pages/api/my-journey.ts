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
    SELECT l.*
    FROM leagues l
    INNER JOIN player_league pl ON pl.league_id = l.id
    WHERE pl.player_id = 1
  `);

  const league = result.rows as Row[];

  res.status(200).json({ league });
}