import type { NextApiRequest, NextApiResponse } from "next";
import { turso } from "nets/lib/turso";
import { Row } from "@libsql/client";

type MatchResponse = {
  league: Row[];
  mode: 'singles' | 'doubles';
  players: {
    left: string[];
    right: string[];
  };
  score: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ matches: MatchResponse[] }>
) {
  // 1. Get all matches
  const matchResult = await turso.execute("SELECT * FROM matches");
  const matches = matchResult.rows;

  const responses: MatchResponse[] = [];

  for (const match of matches) {
    const parsedPlayers = JSON.parse(match.players as string) as {
      left: number[];
      right: number[];
    };

    const allIds = [...parsedPlayers.left, ...parsedPlayers.right];
    const placeholders = allIds.map(() => '?').join(',');
    const playerQuery = `SELECT id, name FROM players WHERE id IN (${placeholders})`;
    const playerResult = await turso.execute({
      sql: playerQuery,
      args: allIds.map(String),
    });

    const playerMap = new Map<number, string>();
    for (const row of playerResult.rows as Row[]) {
      playerMap.set(Number(row.id), row.name as string);
    }

    const leagueQuery = `SELECT * FROM leagues WHERE id = ${match.league_id}`;
    const leagueResult = await turso.execute({
      sql: leagueQuery,
    });

    responses.push({
      league: leagueResult.rows as Row[],
      mode: match.mode === 1 ? "singles" : "doubles",
      players: {
        left: parsedPlayers.left.map(id => playerMap.get(id) || "Unknown"),
        right: parsedPlayers.right.map(id => playerMap.get(id) || "Unknown"),
      },
      score: match.score as string,
    });
  }

  res.status(200).json({ matches: responses });
}
