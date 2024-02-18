import Image from "next/image";
import styles from "./page.module.css";
import { Fira_Sans } from 'next/font/google'
import { Suspense } from "react";

const firaSans = Fira_Sans({
  weight: '500',
  subsets: ['latin'],
})

type Banco = {
  description: string;
  age: number;
  url: string;
  bankName: string;
};

async function getBankList() {
  const res = await fetch('https://dev.obtenmas.com/catom/api/challenge/banks')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {

  const data = await getBankList()

  return (
    <main className={firaSans.className}>
      <Suspense fallback={<div>No data</div>}>
        <div className={styles.title}>
          <div>&nbsp;</div>
          <div>Name</div>
          <div>Age</div>
          <div>Description</div>
        </div>
        {data.map((data: Banco, index: number) => (
          <div
            className={styles.listitem}
            key={index}>
            <div>
              <Image
                src={data.url}
                alt='name'
                width={64}
                height={64}
                className={styles.image} />
            </div>
            <p>{data.bankName}</p>
            <p>{data.age}</p>
            <p>{data.description}</p>
          </div>))}
      </Suspense>
    </main>
  );
}
