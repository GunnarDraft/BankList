import Image from "next/image";
import styles from "./page.module.css";
import { Fira_Sans } from 'next/font/google'
import { Suspense } from "react";

const firaSans = Fira_Sans({
  weight: '500',
  subsets: ['latin'],
})

async function getBankList() {
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

  const data = await getBankList()

  return (
    <main className={firaSans.className}>
      <Suspense fallback={<div>No data</div>}>
        {data.map((data: Banco, index: number) => (
          <div
            className={styles.listitem}
            key={index}>
            <p><Image
              src={data.url}
              alt='name'
              width={100}
              height={100}
              className={styles.image} /></p>
            <p>{data.bankName}</p>
            <p>{data.age}</p>
            <p className={styles.description}>{data.description}</p>
          </div>))}
      </Suspense>
    </main>
  );
}
