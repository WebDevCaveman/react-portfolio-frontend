import type { Route } from "./+types/index";
import type {
  PostMeta,
  Project,
  StrapiPost,
  StrapiProject,
  StrapiResponse,
} from "~/types";
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
  const [projectsRes, postsRes] = await Promise.all([
    fetch(`${API_URL}/projects?filters[featured][$eq]=true&populate=*`),
    fetch(`${API_URL}/posts?populate=image&sort=date:desc`),
  ]);

  const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
  const postsJson: StrapiResponse<StrapiPost> = await postsRes.json();

  const projects = projectsJson.data.map((item: StrapiProject) => ({
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

  const posts = postsJson.data.map((item: StrapiPost) => ({
    ...item,
    readingTime: item.readingMinutes,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  return { projects, posts };
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
