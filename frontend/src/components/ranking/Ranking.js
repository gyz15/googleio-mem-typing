import React, { useEffect, useState } from "react";
import axios from "../../axios-config";

const Ranking = () => {
  const [fetchRanking, setFetchedRanking] = useState([]);

  useEffect(() => {
    axios.get("/api/record/ranking").then((res) => {
      console.log(res.data);
      setFetchedRanking(res.data);
    });
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="container mx-auto w-400">
        <table className="min-w-full bg-white m-10">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
                No.
              </th>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
                Name
              </th>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold">
                Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchRanking.map((row, idx) => (
              <tr key={row._id} className="text-center">
                <td className="py-2 px-4 border-b border-gray-200">
                  {idx + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {row.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {row.marks.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
