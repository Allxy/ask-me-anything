import { useEffect, useRef, useState } from 'react';

const useOnScreen = <T>(
  rootMargin = '0px'
): [boolean, React.RefObject<T>] => {
  const [isIntersecting, setIntersecting] = useState(false);
  const markeRef = useRef(null);
  useEffect(() => {
    const element = markeRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (element != null) {
      observer.observe(element);
    }
    return () => {
      if (element !== null) observer.unobserve(element);
    };
  }, [rootMargin]);
  return [isIntersecting, markeRef];
};

export default useOnScreen;
