// Entry point for generating chessboard arrows from tablebase values
import type { OpeningMoveStats, TablebaseMoveStats } from './interfaces';
import type { DrawShape } from '@lichess-org/chessground/draw';
// Import Key type for type safety
// import type { Key } from 'chessground/types';
import { SquareName } from 'chessops';

export function getPerecentages(move: TablebaseMoveStats | OpeningMoveStats): [number, number, number] {
  console.log('Calculating percentages for move:', move);
  if ('white' in move && 'black' in move) {
    // For OpeningMoveStats
    const total_plays = move.white + move.draws + move.black;
    return [move.white / total_plays, move.draws / total_plays, move.black / total_plays].map(
      (num: number) => num * 100,
    ) as [number, number, number];
  } else {
    return [33, 33, 33];
  }
}
export function tablebaseArrows(
  moves: TablebaseMoveStats[] | OpeningMoveStats[],
  maxTablebaseLines: number = 5,
): DrawShape[] {
  // Use a unique brush key for tablebase arrows
  console.log('Generating tablebase arrows for moves:', moves);
  console.log('what the fuxk');
  // const brushKey = 'tablebase';
  const percentages = moves.map(getPerecentages);
  console.log('Percentages:', percentages);
  const colors: [string, string, string] = ['red', 'green', 'paleBlue'];
  return moves
    .map(move => ({
      orig: move.uci.slice(0, 2) as SquareName,
      dest: move.uci.slice(2, 4) as SquareName,
      brush: 'green', // Use string brush key, not object
      modifiers: {
        gradient: {
          colors: colors,
          percentages: getPerecentages(move),
        },
        hilite: true,
      },
      // label: move.dtm !== null ? { text: String(Math.abs(move.dtm)) } : undefined,
    }))
    .slice(0, maxTablebaseLines);
}
