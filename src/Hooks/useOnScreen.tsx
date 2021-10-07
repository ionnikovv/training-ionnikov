import { useEffect } from 'react';

type Props = {
  ref: HTMLDivElement | null;
  onIntersect: () => void;
  isDisabled: boolean;
};

export function useIntersectionObserver({ ref, onIntersect, isDisabled }: Props): void {
  useEffect(() => {
    if (isDisabled || !ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect();
      },
      { threshold: 0.5, rootMargin: '200px' }
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [ref, onIntersect, isDisabled]);
}
