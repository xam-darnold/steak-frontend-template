import { useEffect, useState } from 'react'

const useIntervalTrigger = (intervalInMs: number) => {
  const [triggerIndex, setTriggerIndex] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => setTriggerIndex(triggerIndex + 1), intervalInMs);

    return () => clearInterval(timerId);
  });

  return triggerIndex
}

export default useIntervalTrigger
