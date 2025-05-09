export type Player = {
  id: number;
  name: string;
  rank: number;
  delta: number;
  points: number;
};

export type League = {
  id: number;
  title: string;
  season: number;
  start: string;
  end: string;
  location: string;
  level: number;
  mode: string;
  point: number;
}

export type Match = {
  id: number;
  league_id: number;
  mode: number;
  players: string;
  score: string | null;
}

export type ParsedMatch = {
  id: number;
  mode: string;
  players: {
    left: string[];
    right: string[];
  }
  score: string | null;
}

export type Matches = ParsedMatch[]