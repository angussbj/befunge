import { useEffect, useState } from "react";

export function useBlink(frequency = 1200): { blink: boolean } {
  const [blink, setBlink] = useState(false);

  const timeout = setTimeout(() => {
    setBlink(!blink);
  }, frequency / 2);

  useEffect(() => {
    return (): void => clearTimeout(timeout);
  }, [timeout]);

  return { blink };
}
