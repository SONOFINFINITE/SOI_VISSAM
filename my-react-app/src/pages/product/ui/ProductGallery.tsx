import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './ProductPage.module.scss';
import { Heart, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useFavoritesStore } from '../../../shared/store/useFavoritesStore';
import { catalogProducts } from '../../../shared/data/products';
import { useParams } from 'react-router-dom';

interface ProductGalleryProps {
  image: string;
  name: string;
}

export function ProductGallery({ image, name }: ProductGalleryProps) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  
  const product = catalogProducts.find(p => p.id === id);
  const toggleFav = useFavoritesStore(state => state.toggleFavorite);
  const favItems = useFavoritesStore(state => state.items);
  const isFav = favItems.some(item => item.id === id);

  const thumbnails = [
    image,
    image, // Placeholder for other angles
    image,
  ];

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveThumb((prev) => (prev + 1) % thumbnails.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveThumb((prev) => (prev - 1 + thumbnails.length) % thumbnails.length);
  };

  return (
    <>
      <div className={s.gallery}>
        <div className={s.gallerySidebar}>
          {thumbnails.map((thumb, idx) => (
            <button 
              key={idx}
              className={`${s.thumb} ${activeThumb === idx ? s.activeThumb : ''}`}
              onClick={() => setActiveThumb(idx)}
            >
              <img src={thumb} alt={`${name} thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
        <div className={s.galleryMain} onClick={() => setIsModalOpen(true)}>
          <div className={s.galleryMain__zoomHint}>
            <ZoomIn size={18} />
            <span>Увеличить</span>
          </div>
          <img src={thumbnails[activeThumb]} alt={name} />
          
          {/* Favorite Button on Image Overlay (Catalog Style) */}
          {product && (
            <button
              className={`${s.galleryFavoriteBtn} ${isFav ? s.favBtnActive : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleFav(product); }}
              aria-label={isFav ? 'Убрать из избранного' : 'В избранное'}
            >
              <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
      </div>

      {isModalOpen && createPortal(
        <div className={s.modal} onClick={() => setIsModalOpen(false)}>
          <button 
            className={s.modal__close} 
            onClick={() => setIsModalOpen(false)}
            aria-label="Закрыть"
          >
            <X size={32} />
          </button>

          <button className={s.modal__prev} onClick={prevImage} aria-label="Назад">
            <ChevronLeft size={48} />
          </button>

          <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
            <img src={thumbnails[activeThumb]} alt={name} />
            <div className={s.modal__counter}>
              {activeThumb + 1} / {thumbnails.length}
            </div>
          </div>

          <button className={s.modal__next} onClick={nextImage} aria-label="Вперед">
            <ChevronRight size={48} />
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
