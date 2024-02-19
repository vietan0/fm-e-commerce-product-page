import Header from './components/Header';
import ProductPage from './components/ProductPage';

export default function App() {
  return (
    <div
      id="App"
      className="mx-auto min-h-screen max-w-screen-xl text-grey-blue-10"
    >
      <Header />
      <main>
        <h1 className="sr-only">
          E-Commerce Produce Page - Frontend Mentor Challenge - Solution by Việt
          An
        </h1>
        <ProductPage />
      </main>
    </div>
  );
}
