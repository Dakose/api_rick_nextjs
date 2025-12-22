import { GetServerSideProps } from "next";
import styles from "@/styles/Home.module.css";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
};

type Props = {
  characters: Character[];
};

export default function Home({ characters }: Props) {
  return (
    <main className={styles.app}>
      <h1>Rick and Morty</h1>

      <div className={styles.characterList}>
        {characters.map((c) => (
          <div key={c.id} className={styles.card}>
            <img src={c.image} alt={c.name} />
            <div className={styles.info}>
              <h2>{c.name}</h2>
              <p>{c.status} – {c.species}</p>
              <p className={styles.grey}>Last known location:</p>
              <p>{c.location.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  return {
    props: {
      characters: data.results,
    },
  };
};
