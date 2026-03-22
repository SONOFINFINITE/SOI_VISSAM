import { useParams, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Header } from '../../widgets/Header/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { blogArticles } from '../../shared/data/blog';
import { catalogProducts } from '../../shared/data/products';
import { ProductCard } from '../../widgets/ProductCard/ProductCard';
import s from './ui/ArticlePage.module.scss';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useGSAP(() => {
    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef);
      gsap.to(q(`.${s.heroImage} img`), {
        scale: 1,
        duration: 1.8,
        ease: 'expo.out'
      });
      
      gsap.fromTo(q(`.${s.heroContent} > *`),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo(q(`.${s.contentWrapper} > *`),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out', delay: 0.4 }
      );
    }
  }, [slug]);

  if (!article) {
    return (
      <>
        <Header />
        <div style={{ padding: '200px 0', textAlign: 'center', color: '#5a5048', fontSize: 24, background: '#fff', minHeight: '100vh' }}>
          Статья не найдена. <br/><br/>
          <Link to="/blog" style={{ color: '#dbc993' }}>Вернуться в блог</Link>
        </div>
        <Footer />
      </>
    );
  }

  // Find associated products, fallback to empty array if no match
  const articleProducts = article.productIds 
    ? article.productIds.map(id => catalogProducts.find(p => p.id === id)).filter(Boolean)
    : [];

  return (
    <>
      <Header />
      <main className={s.articlePage} ref={containerRef}>
        <div className={s.heroImage}>
          <img src={article.image} alt={article.title} />
          <div className={s.heroContent}>
            <div className={s.meta}>
              <span className={s.categoryTag}>{article.category}</span>
              <span className={s.dateTag}>{article.displayDate}</span>
            </div>
            <h1 className={s.title}>{article.title}</h1>
          </div>
        </div>

        <article className={s.contentWrapper}>
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </article>

        {articleProducts.length > 0 && (
          <section className={s.productsSection}>
            <h2 className={s.sectionTitle}>Упомянутые товары</h2>
            <div className={s.grid}>
              {articleProducts.map(product => (
                <ProductCard key={product!.id} product={product!} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
