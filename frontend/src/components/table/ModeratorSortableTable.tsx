import React, { useState } from "react";
import styles from "./Tables.module.scss";
import axios from "axios";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
  apiUrl?: string;
}

const API_BASE_URL = process.env.API_BASE_URL || "https://speed-1-notreallybenjamins-projects.vercel.app";

const ModeratorSortableTable: React.FC<SortableTableProps> = ({
  headers,
  data: initialData,
  apiUrl = API_BASE_URL,
}) => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  const handleApprove = async (index: number) => {
    const article = data[index];
    try {
      const response = await axios.post(
        `${apiUrl}/api/articles/approveArticle?_id=${article._id}`,
        { approved: true }
      );
      console.log('Approve Response:', response);
      const newData = [...data];
      newData[index] = response.data;
      setData(newData);
      setExpandedRowIndex(null);
    } catch (error) {
      console.error('Approve Error:', error);
    }
  };

  const handleReject = async (index: number) => {
    const article = data[index];
    try {
      const response = await axios.post(
        `${apiUrl}/api/articles/rejectArticle?_id=${article._id}`,
        { rejected: true }
      );
      console.log('Reject Response:', response);
      const newData = [...data];
      newData[index] = response.data;
      setData(newData);
      setExpandedRowIndex(null);
    } catch (error) {
      console.error('Reject Error:', error);
    }
  };

  const handleSort = (column: string) => {
    if (sortConfig.key === column) {
      const newDirection =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
      setSortConfig({ key: column, direction: newDirection });
    } else {
      setSortConfig({ key: column, direction: "ascending" });
    }
  };

  const getSortingIndicator = (columnKey: string) => {
    if (columnKey === sortConfig.key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === 'authors' && Array.isArray(aValue) && Array.isArray(bValue)) {
      aValue = aValue[0];
      bValue = bValue[0];
    }

    if (sortConfig.key === 'publication_year') {
      return (Number(aValue) - Number(bValue)) *
        (sortConfig.direction === 'ascending' ? 1 : -1);
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue, undefined, { sensitivity: "base" }) *
        (sortConfig.direction === "ascending" ? 1 : -1);
    }

    return 0;
  });

  return (
    <table className={styles.myTable}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              onClick={() => handleSort(header.key)}
              className={header.key === sortConfig.key ? styles.active : ""}
            >
              {header.label}{" "}
              <span className={styles.sortIndicator}>
                {getSortingIndicator(header.key)}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <>
            <tr key={i} onClick={() => setExpandedRowIndex(expandedRowIndex === i ? null : i)}>
              {headers.map((header) => (
                <td key={header.key}>{row[header.key]}</td>
              ))}
            </tr>
            {expandedRowIndex === i && (
              <tr>
                <td colSpan={headers.length}>
                  <button onClick={() => handleApprove(i)}>Approve</button>
                  <button onClick={() => handleReject(i)}>Reject</button>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default ModeratorSortableTable;
