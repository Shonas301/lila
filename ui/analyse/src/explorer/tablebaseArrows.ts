// Entry point for generating chessboard arrows from tablebase values
import type { OpeningMoveStats, TablebaseMoveStats } from './interfaces';
import type { DrawShape } from 'chessground/draw';
// Import Key type for type safety
// import type { Key } from 'chessground/types';
import { SquareName } from 'chessops';

export function tablebaseArrows(
  moves: TablebaseMoveStats[] | OpeningMoveStats[],
  maxTablebaseLines: number = 5,
): DrawShape[] {
  // Use a unique brush key for tablebase arrows
  console.log('Generating tablebase arrows for moves:', moves);
  // const brushKey = 'tablebase';
  return moves
    .map(move => ({
      orig: move.uci.slice(0, 2) as SquareName,
      dest: move.uci.slice(2, 4) as SquareName,
      brush: 'green', // Use string brush key, not object
      // label: move.dtm !== null ? { text: String(Math.abs(move.dtm)) } : undefined,
    }))
    .slice(0, maxTablebaseLines);
}
