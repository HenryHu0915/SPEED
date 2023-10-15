import { GetStaticProps, NextPage } from "next";
import axios from "axios";
import { useState } from "react";
import ModeratorSortableTable from "../../components/table/ModeratorSortableTable";
import ColumnDropdown from "./ColumnDropdown";
import styles from "./ModeratorView.module.scss";

interface Article {
  id: string;
  title: string;
  authors: string;
  source: string;
  publication_year: string;
  doi: string;
  SE_practice: string;
  claim: string;
  evidence: string;
  approved: boolean;
  rejected: boolean;
}

interface ArticlesProps {
  articles: Article[];
}

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const [activeTab, setActiveTab] = useState<'submitted' | 'approved' | 'rejected' | 'all'>('submitted');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "id", "title", "authors", "source", "publication_year",
    "doi", "SE_practice", "claim", "evidence", "approved", "rejected"
  ]);

  const headers = [
    { key: "title", label: "Title" },
    //... other headers
  ];

  const filterData = () => {
    switch (activeTab) {
      case 'submitted':
        return articles.filter(article => !article.approved && !article.rejected);
      case 'approved':
        return articles.filter(article => article.approved);
      case 'rejected':
        return articles.filter(article => article.rejected);
      default:
        return articles;
    }
  };

  return (
    <div className={styles.container}>
      {/* Rest of the JSX remains the same */}
      <ModeratorSortableTable
        headers={headers.filter((header) => selectedColumns.includes(header.key))}
        data={filterData()}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  try {
    const response = await axios.get("https://your-api-endpoint/api/articles");
    const articles: Article[] = response.data;
    return { props: { articles } };
  } catch (error) {
    console.error("API data fetch error:", error);
    return { props: { articles: [] } };
  }
};

export default Articles;