// If this digit is 5 or less, then round down.  If it's 6 or more, then round up.
export const RoundDown = (number: number, digit: number): number => {
  const remainder = number % digit;
  if (remainder <= 5 * (digit / 10)) {
    return number - remainder;
  } else {
    return number + (digit - remainder);
  }
};
