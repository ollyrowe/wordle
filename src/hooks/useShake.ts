import { useEffect, useState } from "react";
import { SHAKE_ANIMATION_LENGTH } from "../components/animations/Shake";
import { useDebouncedEffect } from "./useDebounceEffect";
/**
 * Hook which returns a boolean indicating whether the component should
 * appear as shaking.
 *
 * @param shakeCount - counter which increments for each shake event.
 * @returns boolean indicating whether the component should be shaking.
 */
export const useShake = (shakeCount: number) => {
  const [shaking, setShaking] = useState(false);

  // Hook which is invoked upon shake count change
  useEffect(() => {
    if (shakeCount > 0) {
      setShaking(true);
    }
  }, [shakeCount]);

  // Reset shake state X milliseconds after the last shake event
  useDebouncedEffect(
    () => setShaking(false),
    [shakeCount],
    SHAKE_ANIMATION_LENGTH
  );

  return shaking;
};
