import Link from 'next/link';
import { CharacterSummary } from '@/types/character';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: CharacterSummary;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link 
      href={`/character/${character.id}`}
      className={styles.cardLink}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img 
            src={character.image} 
            alt={character.name}
            className={styles.image}
          />
          <div className={`${styles.statusBadge} ${styles[character.status.toLowerCase()]}`}>
            {character.status}
          </div>
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.name}>{character.name}</h3>
          
          <div className={styles.details}>
            <div className={styles.species}>
              <span className={styles.label}>Species:</span>
              <span>{character.species}</span>
            </div>
            
            <div className={styles.location}>
              <span className={styles.label}>Location:</span>
              <span>{character.location.name}</span>
            </div>
          </div>
          
          <div className={styles.viewMore}>
            View details →
          </div>
        </div>
      </div>
    </Link>
  );
}