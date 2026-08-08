import type { Config } from "@react-router/dev/config";

// Ten plik wykonuje sie w Node podczas builda, wiec nie ma tu import.meta.env
// (to jest wstrzykiwane dopiero do kodu aplikacji). Na Vercelu zmienna projektu
// jest widoczna jako process.env; lokalnie wpadamy na produkcyjny backend.
const API_URL =
  process.env.VITE_API_URL ??
  "https://react-portfolio-backend-pld8.onrender.com/api";

// Zbiera sciezki dynamiczne (posty i projekty) prosto ze Strapi.
// pageSize=100, bo domyslne 25 uciecie po cichu pominęłoby czesc stron.
async function cmsPaths() {
  const [posts, projects] = await Promise.all([
    fetch(`${API_URL}/posts?pagination[pageSize]=100`).then((r) => r.json()),
    fetch(`${API_URL}/projects?pagination[pageSize]=100`).then((r) => r.json()),
  ]);

  return [
    ...posts.data.map((post: { slug: string }) => `/blog/${post.slug}`),
    ...projects.data.map(
      (project: { documentId: string }) => `/projects/${project.documentId}`,
    ),
  ];
}

export default {
  ssr: true,
  // Kazda trasa dostaje gotowy HTML przy buildzie, wiec w runtime nikt nie puka
  // do CMS-a - uspiona instancja Render przestaje byc problemem odwiedzajacego.
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...(await cmsPaths())];
  },
} satisfies Config;
