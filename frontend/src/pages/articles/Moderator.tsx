import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import data from "../../utils/dummydata.json";
import ModeratorSortableTable from "../../components/table/ModeratorSortableTable";
import { useState } from "react";
import axios from "axios";
import ColumnDropdown from "./ColumnDropdown";
import styles from "./ModeratorView.module.scss";

export interface ArticlesInterface {
  _id: object,
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

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const approvedArticles = articles.filter(article => article.approved === true);
  const rejectedArticles = articles.filter(article => article.rejected === true);
  const submittedArticles = articles.filter(article => !article.approved && !article.rejected);

  const [activeTab, setActiveTab] = useState('submitted');

  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "_id", "title", "authors", "source", "publication_year",
    "doi", "SE_practice", "claim", "evidence", "approved", "rejected"
  ]);

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "publication_year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "SE_practice", label: "SE Practice" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Result of Evidence" },
  ];

  return (
    <div className={styles.container}>
      <h1>SPEED Moderator Dashboard</h1>

      <ColumnDropdown
        options={headers.map((header) => ({
          key: header.key,
          label: header.label,
        }))}
        selectedOptions={selectedColumns}
        onSelect={(selected) => setSelectedColumns(selected)}
      />

      <button onClick={() => setActiveTab('submitted')}>Submitted</button>
      <button onClick={() => setActiveTab('approved')}>Approved</button>
      <button onClick={() => setActiveTab('rejected')}>Rejected</button>
      <button onClick={() => setActiveTab('all')}>All</button>

      {activeTab === 'submitted' && (
        <ModeratorSortableTable
          headers={headers.filter((header) => selectedColumns.includes(header.key))}
          data={submittedArticles}
        />
      )}
      {activeTab === 'approved' && (
        <ModeratorSortableTable
          headers={headers.filter((header) => selectedColumns.includes(header.key))}
          data={approvedArticles}
        />
      )}
      {activeTab === 'rejected' && (
        <ModeratorSortableTable
          headers={headers.filter((header) => selectedColumns.includes(header.key))}
          data={rejectedArticles}
        />
      )}
      {activeTab === 'all' && (
        <ModeratorSortableTable
          headers={headers.filter((header) => selectedColumns.includes(header.key))}
          data={articles}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async (_) => {

  // Map the data to ensure all articles have consistent property names 

  try {
    // Fetch articles from the API endpoint
    const response = await axios.get(
      "https://speed-1-backend-chi.vercel.app/articles"
    );

    // Extract the articles from the API response data
    const articles: ArticlesInterface[] = response.data;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
};

export default Articles;