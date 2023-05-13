import React, { useEffect, useState } from "react";

interface AutoSizerProps {
  children: (size: { width: number; height: number }) => React.ReactNode;
}

const AutoSizer: React.FC<AutoSizerProps> = ({ children }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return <div>{children(size)}</div>;
};
export default AutoSizer;
