import Header from './Header';
import ProductPage from './ProductPage';

export default function App() {
  return (
    <div
      id="App"
      className="mx-auto min-h-screen max-w-screen-lg text-grey-blue-10"
    >
      <Header />
      <main>
        <ProductPage />
      </main>
    </div>
  );
}
