export const debounce = <T>(cb: (...args: T[]) => unknown, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: T[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, wait);
  };
};
