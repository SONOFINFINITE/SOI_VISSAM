import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { blogArticles } from '../../shared/data/blog';
import s from './ui/BlogPage.module.scss';

export function BlogPage() {
  const containerRef = useRef<HTMLElement>(null);
  const ARTICLES_PER_PAGE = 7;
  
  const categories = ['Все', ...Array.from(new Set(blogArticles.map(a => a.category)))];
  const [activeCategory, setActiveCategory] = useState('Все');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting and Filtering logic
  const filteredArticles = useMemo(() => {
    let result = [...blogArticles];
    
    // Filter by category
    if (activeCategory !== 'Все') {
      result = result.filter(a => a.category === activeCategory);
    }
    
    // Sort logic
    result.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (sortBy === 'newest') return dateB - dateA;
        return dateA - dateB;
    });
    
    return result;
  }, [activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

  const displayedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const displayTitle = activeCategory === 'Все' ? 'БЛОГ' : activeCategory;

  const sortOptions = [
    { id: 'newest', label: 'Сначала новые' },
    { id: 'oldest', label: 'Сначала старые' },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useGSAP(() => {
    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef);
      
      // Split text animation for title (matching Collections)
      gsap.fromTo(q('.hero-title-char'), 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.05, 
          ease: 'power4.out',
          delay: 0.2
        }
      );
      
      // Cards grid animation
      gsap.fromTo(q(`.${s.articleCard}`),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    }
  }, [activeCategory, sortBy, currentPage]);

  const renderTitle = (title: string) => {
    return title.split(' ').map((word, wIdx) => (
      <span key={wIdx} className={s.titleWord}>
        {word.split('').map((char, cIdx) => (
          <span 
            key={cIdx} 
            className="hero-title-char" 
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <>
      <Header />
      <main className={s.blogPage} ref={containerRef}>
        <div className={s.container}>
          <div className={s.heroHeader}>
            <h1 className={s.magTitle} key={displayTitle}>
                {renderTitle(displayTitle.toUpperCase())}
            </h1>
          </div>
          
          <div className={s.mainContent}>
            <div className={s.leftColumn}>
              
              <div className={s.blogControls}>
                <div className={s.categories}>
                  {categories.map(c => (
                    <button 
                      key={c}
                      className={`${s.categoryBtn} ${activeCategory === c ? s.active : ''}`}
                      onClick={() => {
                        setActiveCategory(c);
                        setCurrentPage(1);
                      }}
                    >
                      {c.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className={s.sort}>
                  <span className={s.sort__label}>Сортировать:</span>
                  <div className={s.sort__container}>
                    <button 
                      className={s.sort__select}
                      onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                      <span className={s.sort__activeLabel}>
                        {sortOptions.find(o => o.id === sortBy)?.label}
                      </span>
                      <ChevronDown className={`${s.sort__icon} ${isSortOpen ? s['sort__icon--active'] : ''}`} size={14} />
                    </button>

                    {isSortOpen && (
                      <div className={s.sort__dropdown}>
                        {sortOptions.map(option => (
                          <button
                            key={option.id}
                            className={`${s.sort__option} ${sortBy === option.id ? s['sort__option--active'] : ''}`}
                            onClick={() => {
                              setSortBy(option.id as any);
                              setIsSortOpen(false);
                              setCurrentPage(1);
                            }}
                          >
                            <div className={s.sort__radio}>
                              <div className={s.sort__radioInner} />
                            </div>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={s.grid}>
                {displayedArticles.map((article) => (
                  <Link 
                    to={`/blog/${article.slug}`} 
                    key={article.id} 
                    className={s.articleCard}
                  >
                    <div className={s.imageBox}>
                      <img src={article.image} alt={article.title} />
                    </div>
                    <div className={s.overlay} />
                    <div className={s.content}>
                      <div className={s.meta}>
                        <span className={s.date}>{article.displayDate}</span>
                        <span className={s.category}>{article.category}</span>
                      </div>
                      <h3 className={s.title}>{article.title}</h3>
                      <p className={s.excerpt}>{article.content}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className={s.pagination}>
                  <button 
                    className={s.pagination__btn} 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className={s.pagination__pages}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`${s.pagination__page} ${currentPage === page ? s['pagination__page--active'] : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    className={s.pagination__btn} 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>

            <aside className={s.sidebar}>
              <nav className={s.sidebarNav}>
                <Link to="/payment" className={s.sidebarLink}>Условия оплаты</Link>
                <Link to="/delivery" className={s.sidebarLink}>Условия доставки</Link>
                <Link to="/privacy" className={s.sidebarLink}>Политика конфиденциальности</Link>
              </nav>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
