import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Character } from "@/types/character";
import styles from "@/styles/Character.module.css";

interface CharacterPageProps {
  character: Character;
}

export default function CharacterPage({ character }: CharacterPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading character...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{character.name} | Rick and Morty</title>
        <meta name="description" content={`Details about ${character.name}`} />
      </Head>

      <main className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.backLink}>
            <span className={styles.backArrow}>←</span>
            Back to Characters
          </Link>
        </nav>

        <div className={styles.characterContainer}>
          <div className={styles.imageSection}>
            <img 
              src={character.image} 
              alt={character.name}
              className={styles.characterImage}
            />
            
            <div className={styles.statusContainer}>
              <div className={`${styles.status} ${styles[character.status.toLowerCase()]}`}>
                {character.status}
              </div>
              <div className={styles.species}>{character.species}</div>
              {character.type && (
                <div className={styles.type}>({character.type})</div>
              )}
            </div>
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.characterName}>{character.name}</h1>
            
            <div className={styles.infoGrid}>
              <InfoItem label="Gender" value={character.gender} />
              <InfoItem label="Origin" value={character.origin.name} />
              <InfoItem label="Location" value={character.location.name} />
              <InfoItem 
                label="Episodes" 
                value={`Appears in ${character.episode.length} episodes`} 
              />
              <InfoItem 
                label="Created" 
                value={new Date(character.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} 
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.infoItem}>
      <div className={styles.infoLabel}>{label}</div>
      <div className={styles.infoValue}>{value}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        return { notFound: true };
      }
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const character: Character = await res.json();

    return {
      props: {
        character,
      },
    };
  } catch (error) {
    console.error("Error fetching character:", error);
    return {
      notFound: true,
    };
  }
};