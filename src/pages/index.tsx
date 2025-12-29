// pages/index.tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import CharacterCard from "@/components/CharacterCard";
import { CharacterSummary } from "@/types/character";
import styles from "@/styles/Home.module.css";

interface HomeProps {
  characters: CharacterSummary[];
}

export default function Home({ characters }: HomeProps) {
  return (
    <>
      <Head>
        <title>Rick and Morty Characters</title>
        <meta name="description" content="Browse all Rick and Morty characters" />
      </Head>
      
      <main className={styles.app}>
        <div className={styles.header}>
          <h1 className={styles.title}>Rick and Morty</h1>
          <p className={styles.subtitle}>
            Browse through all characters from the multiverse
          </p>
          <div className={styles.stats}>
            <span className={styles.statBadge}>
              {characters.length} Characters
            </span>
          </div>
        </div>

        <div className={styles.characterList}>
          {characters.map((character) => (
            <CharacterCard 
              key={character.id} 
              character={character} 
            />
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    
    const characters: CharacterSummary[] = data.results.map((char: any) => ({
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      image: char.image,
      location: {
        name: char.location.name,
      },
    }));

    return {
      props: {
        characters,
      },
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    
    return {
      props: {
        characters: [],
      },
    };
  }
};