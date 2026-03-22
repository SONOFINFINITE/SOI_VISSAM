import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Collection } from '../../../../shared/data/collections';
import s from './CollectionSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface CollectionSectionProps {
  collections: Collection[];
}

const getShortDescription = (desc: string) => {
  const sentences = desc.match(/[^.!?]+[.!?]+/g);
  return sentences ? sentences.slice(0, 2).join(' ').trim() : desc;
};

// Internal Modal component for Collection details
function CollectionModal({ collection, onClose }: { collection: Collection; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={s.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className={s.modalContent} 
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundImage: `url(${collection.images[0]})` }}
      >
        <button className={s.modalClose} onClick={onClose} aria-label="Закрыть">
          <X size={24} />
        </button>
        <div className={s.modalGlass}>
          <h2 className={s.modalTitle}>{collection.name}</h2>
          <p className={s.modalDesc}>{collection.description}</p>
          <a href={`/catalog/?collection=${encodeURIComponent(collection.name)}`} className={s.modalLink}>
            Открыть коллекцию <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function CollectionSection({ collections }: CollectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (bentoRef.current) {
        const cards = bentoRef.current.querySelectorAll('[data-card]');
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.95, y: 24 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: bentoRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const displayCollections = collections.slice(0, 6);

  return (
    <section ref={sectionRef} className={s.section} id="collections" aria-label="Наши Коллекции">
      <div className={s.inner}>
        <div ref={headerRef} className={s.header}>
          <div className={s.headerContent}>
            <h2 className={s.title}>Наши Коллекции</h2>
            <p className={s.desc}>
              Откройте для себя стильные и современные дизайнерские решения для вашего интерьера. 
              Серии мебели, продуманные до мельчайших деталей.
            </p>
          </div>
          <a href="/collection" className={s.link}>
            <span>Все коллекции</span>
            <div className={s.linkIcon}>
              <ArrowUpRight strokeWidth={2.5} size={18} />
            </div>
          </a>
        </div>

        <div ref={bentoRef} className={s.bento}>
          {displayCollections.map((col, i) => (
            <button 
              key={col.id} 
              className={s.card} 
              data-card
              onClick={() => setSelectedCollection(col)}
              aria-label={`Описание коллекции ${col.name}`}
            >
              <img
                src={col.images[0]}
                alt={col.name}
                className={s.cardImg}
                loading={i < 2 ? 'eager' : 'lazy'}
              />
              <div className={s.cardOverlay}>
                <div className={s.cardHeader}>
                  <h3 className={s.cardTitle}>{col.name}</h3>
                  <div className={s.iconWrapper}>
                    <ArrowUpRight strokeWidth={2.5} size={20} />
                  </div>
                </div>
                <div className={s.cardBody}>
                  <p className={s.cardDesc}>{getShortDescription(col.description)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedCollection && (
        <CollectionModal 
          collection={selectedCollection} 
          onClose={() => setSelectedCollection(null)} 
        />
      )}
    </section>
  );
}
