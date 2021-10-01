import { MutableRefObject, RefObject, useEffect, useState } from 'react';

type Props = {
  ref: RefObject<HTMLDivElement> | MutableRefObject<HTMLDivElement>;
  onScreen: () => void;
};

export function useOnScreen({ ref, onScreen }: Props): void {
  const [isEntry, setIsEntry] = useState(false);
  const observable = ref.current;

  useEffect(() => {
    if (!observable) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsEntry(true);
      },
      { threshold: 1.0, rootMargin: '20px' }
    );

    observer.observe(observable);

    return () => {
      observer.unobserve(observable);
    };
  }, [observable]);

  useEffect(() => {
    if (isEntry) {
      onScreen();
      setIsEntry(false);
    }
  }, [isEntry, onScreen]);
}
