import { MutableRefObject, RefObject, useEffect, useState } from 'react';

type Props = {
  ref: RefObject<HTMLDivElement> | MutableRefObject<HTMLDivElement>;
};

const options = {
  rootMargin: '-200px',
  // threshold: 0.1,
};

export function useOnScreen({ ref }: Props): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const [observeRefValue, setObserveRefValue] = useState<HTMLDivElement>();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      console.log(entry.isIntersecting);
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
      setObserveRefValue(ref.current);
    }
    return () => {
      if (observeRefValue) {
        observer.unobserve(observeRefValue);
      }
    };
  }, [ref, observeRefValue]);

  return isIntersecting;
}
