import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './styles/global.scss';
import { HomePage } from '../pages/home/HomePage';
import { CatalogPage } from '../pages/catalog/CatalogPage';
import { CartPage } from '../pages/cart/CartPage';
import { FavoritesPage } from '../pages/favorites/FavoritesPage';
import { CollectionsPage } from '../pages/collections/CollectionsPage';
import { ProductPage } from '../pages/product/ProductPage';
import { CheckoutPage } from '../pages/checkout/CheckoutPage';
import { PromotionsPage } from '../pages/promotions/PromotionsPage';
import { BlogPage } from '../pages/blog/BlogPage';
import { ArticlePage } from '../pages/article/ArticlePage';
import { PaymentPage } from '../pages/info/PaymentPage';
import { DeliveryPage } from '../pages/info/DeliveryPage';
import { PrivacyPage } from '../pages/info/PrivacyPage';
import { CompanyPage } from '../pages/company/CompanyPage';
import { ContactsPage } from '../pages/contacts/ContactsPage';
import { ForgotPassPage } from '../pages/forgotpass/ForgotPassPage';
import { SignupPage } from '../pages/signup/SignupPage';
import { AccountPage } from '../pages/account/AccountPage';
import { NotFoundPage } from '../pages/notfound/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog/*" element={<CatalogPage />} />
        <Route path="/collection" element={<CollectionsPage />} />
        <Route path="/sale" element={<PromotionsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/forgotpass" element={<ForgotPassPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/personal" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
