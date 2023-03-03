import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";



export default function Home() {
  const [edInput, setedInput, lastInput] = useState("");
  const [result, setResult] = useState();



  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ edwardian: edInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      //setedInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
        <style jsx global>{`
  body {
    background: #EEE3EB;
  }
`}</style>
      <Head>
        <title>Edwardianiser</title>
        <link rel="icon" href="/lady.png" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <main className={styles.main}>
        <img src="/lady.png"/>
        <h3>Edwardianiser</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="edwardian"
            placeholder="Enter text to make Edwardian"
            value={edInput}
            onChange={(e) => setedInput(e.target.value)}
          />
          <input type="submit" value="Generate Text" />
        </form>
        <div className={styles.result}><br/>Input: {edInput}</div>
        <div className={styles.result}>Output: {result}</div>
      </main>
    </div>
  );
}
