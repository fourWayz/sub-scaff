"use client";

import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { FaCalendarAlt, FaRegComment, FaUser } from "react-icons/fa";

const LatestPost = () => {
  const [latestPosts, setLatestPosts] = useState<any>([]);

  const apollo_client = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/76636/social-dapp/version/latest",
    cache: new InMemoryCache(),
  });

  const parseDate = (date: string) => {
    return new Date(Number(date) * 1000).toLocaleDateString("en-US");
  };

  const GET_ITEMS = gql`
    query {
      postCreateds(first: 4, orderBy: blockTimestamp) {
        id
        author
        content
        timestamp
        blockTimestamp
        transactionHash
      }
    }
  `;

  useEffect(() => {
    apollo_client
      .query({
        query: GET_ITEMS,
      })
      .then(response => {
        const data = response.data.postCreateds;
        setLatestPosts(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="mt-3" style={{ margin: "20px" }}>
      <h3 className="text-2xl font-semibold mb-4">Latest Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {latestPosts?.map((post: any, index: number) => (
          <div className="mb-3" key={index}>
            <div className="bg-white shadow rounded-lg p-4">
              <img
                src={`https://picsum.photos/seed/${post.id}/300/200`}
                alt="Random"
                className="w-full h-40 object-cover rounded mb-4"
              />
              <div className="mb-4 flex items-center">
                <FaUser className="text-gray-500 mr-2" style={{ color: "blue" }} />
                <h6 className="text-sm font-medium text-gray-500">{post.author.toString()}</h6>
              </div>
              <div className="flex items-start">
                <FaRegComment
                  className="text-gray-500 mr-2"
                  style={{ position: "relative", top: "22px", color: "blue" }}
                />
                <p className="text-gray-700">{post.content}</p>
              </div>
              <div className="mb-4 flex items-center">
                <FaCalendarAlt className="text-red-500 mr-2" />
                <h6 className="text-sm font-medium text-gray-500">{parseDate(post.timestamp.toString())}</h6>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => window.open(`https://sepolia.etherscan.io/tx/${post.transactionHash}`, "_blank")}
              >
                Check on Etherscan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPost;
