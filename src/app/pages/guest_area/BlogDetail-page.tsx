import { useParams } from "react-router-dom";
import Footer from "../../../components/Landing_Page/footer";
import HomepageNavBar from "../../../components/Landing_Page/homepage-nav-bar";
import { BlogService } from "../../../feature/BlogService";
import "../../CSS/BlogDetail.css";



interface Author {
  name: string;
  avatarUrl: string;
}

interface RelatedArticle {
  id: number;
  title: string;
  imageUrl: string;
}

interface BlogPost {
  id: number;
  title: string;
  synopsis: string;
  author: Author;
  publishDate: string;
  imageUrl: string;
  content: string[];
  relatedArticles: RelatedArticle[];
}



export default function BogDetailPage() {


  const { id } = useParams();
  const blogId = Number(id);
  const currentPost = BlogService.getBlogById(blogId);

  if (!currentPost) {
    return <div className="page-container">Blog not found.</div>;
  }
  return (
    <div className="app-shell">
      <HomepageNavBar />
      <BlogPage post={currentPost} />
      <Footer />
    </div>
  );
}

// --- Page & Layout Components ---
const BlogPage = ({ post }: { post: BlogPost }) => {
  return (
    <div className="page-container">
      <Breadcrumb title={post.title} />
      <div className="blog-post-container">
        <img src={post.imageUrl} alt={post.title} className="blog-image" />
        <BlogHeader title={post.title} synopsis={post.synopsis} />
        <BlogContent content={post.content} author={post.author} publishDate={post.publishDate} />
      </div>
      <RelatedArticles articles={post.relatedArticles} />
    </div>
  );
};

const Breadcrumb = ({ title }: { title: string }) => (
  <nav className="breadcrumb">
    <a href="#">Medical Blog</a>
    <span>&gt;</span>
    <span>{title}</span>
  </nav>
);

const BlogHeader = ({ title, synopsis }: { title: string; synopsis: string }) => (
  <header className="blog-header">
    <h1>{title}</h1>
    <p>{synopsis}</p>
  </header>
);

const BlogContent = ({
  content,
  author,
  publishDate,
}: {
  content: string[];
  author: Author;
  publishDate: string;
}) => (
  <article className="blog-content">
    {content.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}

    <div className="highlight-box">
      <strong>Remember:</strong> Creating a supportive environment at home is just as important. Healthy habits, open communication, and professional support are key pillars for a child's mental well-being.
    </div>

    <BlogMeta author={author} publishDate={publishDate} />
  </article>
);

const BlogMeta = ({ author, publishDate }: { author: Author; publishDate: string }) => (
  <footer className="blog-meta">
    <img src={author.avatarUrl} alt={author.name} className="author-avatar" />
    <div className="author-info">
      <div className="author-name">{author.name}</div>
      <div className="publish-date">
        Published on{" "}
        {new Date(publishDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  </footer>
);

const RelatedArticles = ({ articles }: { articles: RelatedArticle[] }) => (
  <section className="related-articles-section">
    <h2>Related Articles</h2>
    <div className="related-articles-grid">
      {articles.map((article) => (
        <a href="#" key={article.id} className="related-article-card">
          <img src={article.imageUrl} alt={article.title} className="related-article-image" />
          <div>
            <h3 className="related-article-title">{article.title}</h3>
          </div>
        </a>
      ))}
    </div>
  </section>
);

