import Image from "next/image";
import styles from "./page.module.css";
import { Fira_Sans } from 'next/font/google'
import { Suspense } from "react";
import getBankList from "@/api";
import { Banco } from "@/types";

const firaSans = Fira_Sans({
  weight: '500',
  subsets: ['latin'],
})

export default async function Home() {

  const data = await getBankList()

  return (
    <main className={firaSans.className}>
      <Suspense fallback={<div>Sin Datos</div>}>
        <div className={styles.title}>
          <div>&nbsp;</div>
          <div>Nombre</div>
          <div>Edad</div>
          <div>Descripción</div>
        </div>
        {data.map((data: Banco, index: number) => (
          <div
            className={styles.listitem}
            key={`${data.bankName}-${index}`}>
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
