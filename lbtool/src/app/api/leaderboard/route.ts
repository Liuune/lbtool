import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=europe&leaderboard=0', {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  });

  const data = await res.json();
  return NextResponse.json(data.leaderboard || []);
}