import { useEffect, useState } from "react";

export function useBlink(enabled?: boolean): { blink: boolean } {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (enabled) setBlink((blink) => !blink);
    }, 600);
    return (): void => clearInterval(interval);
  }, [enabled]);

  return { blink };
}
