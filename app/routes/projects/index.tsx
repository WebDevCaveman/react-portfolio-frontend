import type { Route } from "./+types/index";
import type { Project, StrapiResponse, StrapiProject } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";
import CategoryFilter from "~/components/CategoryFilter";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const API_URL = import.meta.env.VITE_API_URL;

// Aby w Strapi pobrac wszystkie pola relacji (np. obrazki, kategorie), trzeba dodac query param "populate=*". W przeciwnym razie Strapi zwroci tylko ID relacji, a nie jej zawartosc.
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${API_URL}/projects?populate=*`);
  const json: StrapiResponse<StrapiProject> = await res.json();

  const projects = json.data.map((item: StrapiProject) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    shortDescription: item.shortDescription,
    description: item.description,
    category: item.category,
    featured: item.featured,
    date: item.date,
    url: item.url,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  return { projects };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const { projects } = loaderData as { projects: Project[] };

  // Aby uzyskac liste kategorii, uzywamy Set, aby usunac duplikaty i dodajemy "All" jako pierwsza kategorie. Set jest struktura danych, ktora przechowuje unikalne wartosci. W tym przypadku, tworzymy nowy Set z tablicy kategorii projektow, a nastepnie konwertujemy go z powrotem na tablice za pomoca operatora spread (...).
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="py-8">
      <p className="text-caption-1 font-semibold uppercase tracking-widest text-brand">
        Projects
      </p>
      <h1 className="mt-3 font-display text-h3 font-bold text-text">
        Things I've built.
      </h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* AnimatePresence pozwala animowac elementy, ktore ZNIKAJA z drzewa Reacta
          (sam React nie daje na to zadnego hooka - usuwa element natychmiast).
          mode="popLayout" wyjmuje znikajaca karte z ukladu strony od razu, dzieki
          czemu pozostale karty od razu plynnie przesuwaja sie na jej miejsce.
          popLayout pozycjonuje znikajacy element absolutnie, wiec kontener siatki
          musi miec position inny niz static - stad "relative". */}
      <div className="relative mt-6 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {currentProjects.map((project) => (
            <motion.div
              // key musi byc stabilne i unikalne - po nim Motion poznaje, ktora
              // karta zostala dodana, a ktora usunieta
              key={project.id}
              // layout = animuj tez zmiane POZYCJI karty w siatce (przesuniecie
              // po odfiltrowaniu sasiada), nie tylko pojawienie sie i zniknięcie
              layout
              // initial -> stan startowy karty wchodzacej, animate -> stan docelowy
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              // exit -> stan, do ktorego karta animuje sie przed usunieciem z DOM
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
