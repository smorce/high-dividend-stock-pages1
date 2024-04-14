// app/page.tsx
import { getServerSideProps } from './data/getServerSideProps';
import Home from './components/Home';

export { getServerSideProps };  // getServerSideProps をエクスポート

export default function Page({ data }) {
  return <Home data={data} />;
}