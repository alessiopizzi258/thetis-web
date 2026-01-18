import { siteData } from './data/data';

// --- HOME ---
export const Home = () => (
  <PageWrapper>
    <div className="h-[70vh] flex flex-col justify-center items-center text-center">
      <h1 className="font-serif italic text-6xl md:text-8xl mb-8 leading-tight">
        {siteData.hero.title}
      </h1>
      <p className="font-sans tracking-[0.4em] text-sm text-gray-500">
        {siteData.hero.subtitle}
      </p>
    </div>
  </PageWrapper>
);





