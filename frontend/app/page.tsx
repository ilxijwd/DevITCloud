"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  const [clicked, setClicked] = useState(false);
  const [concurrency, setConcurrency] = useState(0);

  const start = async () => {
    setResult("");
    setClicked(true);

    const requests = [];
    const raw = Array.from({ length: 1000 }, (_, i) =>
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ index: i + 1 })
      }).then((r) => r.json().then((json) => json))
    );

    /**
     * the input value should be used as a concurrency limit, so that
     * if concurrency is 10 each chunk then will contain 10 requests that
     * will be processed by Promise.all in a concurrent way
     */
    for (let i = 0; i < raw.length; i += concurrency) {
      const chunk = raw.slice(i, i + concurrency);
      requests.push(chunk);
    }

    /**
     * the input value should be used as requests limit per second, so that
     * if Promise.all performs too fast the next one could be delayed to
     * match the requirements
     */
    for (const chunk of requests) {
      const start = performance.now();
      const responses = await Promise.all(chunk);
      const end = performance.now();
      if (end - start < 1000) {
        await new Promise((r) => setTimeout(r, 1000 - (end - start)));
      }
      setResult((prev) => `${prev} ${responses.join(", ")}, `);
    }

    setClicked(false);
  };

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24">
      <div className="flex flex-col items-center gap-2">
        <input
          className="text-black w-12"
          type="number"
          disabled={clicked}
          value={concurrency}
          min={0}
          max={100}
          onChange={(e) => {
            let { value, min, max } = e.target;
            setConcurrency(Math.max(Number(min), Math.min(Number(max), Number(value))));
          }}
        />
        <button disabled={clicked} onClick={start}>
          Start
        </button>
        {/* client-side js should render the results of server responses (request indexes) 
            to one list immediately after each response */}
        <div className="w-96 text-wrap break-words">{result}</div>
      </div>
    </main>
  );
}
