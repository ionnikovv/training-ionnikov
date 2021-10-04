import { MutableRefObject, RefObject, useEffect } from 'react';

type Props = {
  ref: RefObject<HTMLDivElement> | MutableRefObject<HTMLDivElement>;
  onIntersect: () => void;
};

export function useIntersectionObserver({ ref, onIntersect }: Props): void {
  useEffect(() => {
    const observable = ref.current;

    if (!observable) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect();
      },
      { threshold: 0.5, rootMargin: '300px' }
    );

    observer.observe(observable);

    return () => {
      observer.unobserve(observable);
    };
  }, [ref, onIntersect]);
}
