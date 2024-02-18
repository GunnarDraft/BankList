import Image from "next/image";
import styles from "./page.module.css";

async function getData() {
  const res = await fetch('https://dev.obtenmas.com/catom/api/challenge/banks')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
type Banco = {
  description: string;
  age: number;
  url: string;
  bankName: string;
};
export default async function Home() {
  const data = await getData() 
  return (
    <main className={styles.main}>
      {data.map((data: Banco) =><div>
        {data.bankName}
        {data.age}
        {data.url}
        {data.description}
      </div>)}
    </main>
  );
}
