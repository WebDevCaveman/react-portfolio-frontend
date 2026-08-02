import type { Route } from "./+types/index";
import type { PostMeta, Project } from "~/types";
import FeaturedProjects from "~/components/FeaturedProjects";
import LatestPosts from "~/components/LatestPosts";
const API_URL = import.meta.env.VITE_API_URL;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Portfolio | Home" },
    {
      name: "description",
      content: "Simple & Friendly Dev Portfolio build with React",
    },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const postsUrl = new URL("/posts-meta.json", request.url);
  const [projectsRes, postsRes] = await Promise.all([
    fetch(`${API_URL}/projects`),
    fetch(postsUrl.href),
  ]);
  const [projects, posts] = await Promise.all([
    projectsRes.json(),
    postsRes.json(),
  ]);

  return {
    projects: projects.filter((project: Project) => project.featured),
    posts,
  };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <LatestPosts posts={posts} count={2} />
    </>
  );
};

export default HomePage;
