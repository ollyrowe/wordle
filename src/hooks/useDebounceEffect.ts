import { useEffect } from "react";

/**
 * Hook which calls an effect after a specified debounce period.
 *
 * @param effect - the effect to be invoked.
 * @param deps - the hook dependency list.
 * @param delay - the delay in milliseconds.
 */
export const useDebouncedEffect = (
  effect: () => void,
  deps: React.DependencyList = [],
  delay: number
) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
};
