import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

// W pliku routes mozemy zdefiniowac layout dla naszych stron - co oznacza, ze mozemy sprawic, ze dana strona bedzie miala inny layout niz reszta aplikacji. W tym przypadku, layout dla strony "home" jest zdefiniowany w pliku "./routes/layouts/home.tsx". Czyli najpierw przekazujemy layout (plik ze zdefiniowanym layoutem), a nastepnie przekazujemy tablice zdefiniowanych sciezek (routes) dla tego layoutu.

export default [
  layout("./routes/layouts/home.tsx", [index("routes/home/index.tsx")]),
  layout("./routes/layouts/main.tsx", [
    route("about", "./routes/about/index.tsx"),
    route("contact", "./routes/contact/index.tsx"),
    route("projects", "./routes/projects/index.tsx"),
    route("projects/:documentId", "./routes/projects/details.tsx"),
    route("blog", "./routes/blog/index.tsx"),
    route("blog/:slug", "./routes/blog/details.tsx"),
  ]),
] satisfies RouteConfig;
