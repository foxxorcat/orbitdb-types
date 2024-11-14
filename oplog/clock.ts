
export interface Clock {
    id: string;
    time: number;
}

/**
 * Creates an instance of Clock.
 * @param {string} id A unique identifier.
 * @param {number} [time=0] A natural number (including 0).
 */
declare function Clock(id: string, time?: number): Clock;

/**
 * Compares two clocks by time and then, time is the same, by id.
 *
 * compareClocks should never return zero (0). If it does, a and b refer to the
 * same clock.
 * @param a The first clock.
 * @param b The second clock.
 * @return Returns a negative integer if clock a is less than clock b
 * otherwise a positive integer is returned.
 */
declare function compareClocks(a: Clock, b: Clock): number;

/**
 * Advances a clock's time by 1, returning a new instance of Clock.
 * @param clock The clock to advance.
 * @return A new instance of clock with time advanced by 1.
 */
declare function tickClock(clock: any): Clock;

export { Clock as default, tickClock, compareClocks, };