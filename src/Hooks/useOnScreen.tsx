import { useEffect } from 'react';
// type Options = {
//   root: null;
//   rootMargin: string | undefined;
//   threshold: number | null;
// };
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1,
};

function useOnScreen(): void {
  useEffect(() => {
    const observer = new IntersectionObserver(() => {
      console.log('');
    }, options);
  }, []);
}

export default useOnScreen;
