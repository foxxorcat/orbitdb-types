import type { Entry } from "./entry";

export type EesolveConflict = (arg0: Entry, arg1: Entry) => number
/**
 * Sort two entries by their clock time.
 * @param a First entry to compare
 * @param b Second entry to compare
 * @param resolveConflict A function to call if entries are
 * concurrent (happened at the same time). The function should take in two
 * entries and return 1 if the first entry should be chosen and -1 if the
 * second entry should be chosen.
 * @return 1 if a is greater, -1 if b is greater
 */
declare function SortByClocks(a: Entry, b: Entry, resolveConflict: EesolveConflict): number;

/**
 * Sort two entries by their clock id.
 * @param a First entry to compare
 * @param b Second entry to compare
 * @param resolveConflict A function to call if the clocks ids
 * are the same. The function should take in two entries and return 1 if the
 * first entry should be chosen and -1 if the second entry should be chosen.
 * @return 1 if a is greater, -1 if b is greater
 */
declare function SortByClockId(a: Entry, b: Entry, resolveConflict: EesolveConflict): number;

/**
 * Sort two entries as Last-Write-Wins (LWW).
 *
 * Last Write Wins is a conflict resolution strategy for sorting elements
 * where the element with a greater clock (latest) is chosen as the winner.
 *
 * @param a First entry
 * @param b Second entry
 * @return 1 if a is latest, -1 if b is latest
 * @private
 */
declare function LastWriteWins(a: Entry, b: Entry): number;

/**
 * A wrapper function to throw an error if the results of a passed function
 * return zero
 * @param  func The tiebreaker function to validate.
 * @return 1 if a is greater, -1 if b is greater
 * @throws {Error} if func ever returns 0
 * @private
 */
declare function NoZeroes(func: EesolveConflict): EesolveConflict;

export default {
    SortByClocks,
    SortByClockId,
    LastWriteWins,
    NoZeroes
  }