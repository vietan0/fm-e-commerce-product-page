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
        <ProductPage />
      </main>
    </div>
  );
}
