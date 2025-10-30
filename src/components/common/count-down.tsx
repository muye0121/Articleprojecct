import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
type CountDownProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  onFinish?: () => void;
};
const CountDown: FC<CountDownProps> = ({ prefix, value, onFinish, suffix }) => {
  const [count, setCount] = useState(value);
  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);
  useEffect(() => {
    if (count === 0) {
      clearInterval(timerRef.current);
      onFinish&&onFinish();
    }
  }, [count]);
  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
};
export default CountDown;
