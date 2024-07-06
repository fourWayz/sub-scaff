import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { FaComment, FaPlus, FaThumbsUp, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

let wallet: any;
if (typeof window !== "undefined") {
  wallet = (window as any).ethereum;
}

/**
 * The main component for the social media application.
 * @returns {JSX.Element} The rendered component.
 */
const SocialMedia = () => {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any>([]);
  const [registeredUser, setRegisteredUser] = useState<undefined | string>(undefined);
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({}); // State for comment text

  // const contractABI = deployedContracts[31337].Social.abi; // hardhat
  // const contractAddress = deployedContracts[31337].Social.address; // hardhat

  const contractABI = deployedContracts[11155111].Social.abi; // sepolia
  const contractAddress = deployedContracts[11155111].Social.address; // sepolia

  const { writeContractAsync: registerUser } = useScaffoldWriteContract("Social");
  const { writeContractAsync: createPost } = useScaffoldWriteContract("Social");
  const { writeContractAsync: likePost } = useScaffoldWriteContract("Social");
  const { writeContractAsync: addComment } = useScaffoldWriteContract("Social");

  // const { data: AllPosts } = useScaffoldReadContract({
  //   contractName: "Social",
  //   functionName: "getAllPosts"
  // });

  const { data: PostsCount } = useScaffoldReadContract({
    contractName: "Social",
    functionName: "getPostsCount",
  });

  const { address } = useAccount();

  // fetch registered user onMount
  useEffect(() => {
    fetchRegisteredUser();
  });

  /**
   * Registers a new user.
   */
  const Register = async () => {
    try {
      await registerUser({
        functionName: "registerUser",
        args: [username],
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        text: `Registered successfully!`,
        showConfirmButton: true,
        timer: 4000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Retrieve current user.
   */

  const fetchRegisteredUser = async function () {
    if (address) {
      try {
        const provider = new ethers.providers.Web3Provider(wallet);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const user = await contract.getUserByAddress(address.toString());
        setRegisteredUser(user);
      } catch (error) {
        console.error(error);
      }
    }
  };

  /**
   * Creates a new post.
   */
  const CreatePost = async () => {
    try {
      await createPost({
        functionName: "createPost",
        args: [content],
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        text: `Post created!`,
        showConfirmButton: true,
        timer: 4000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fetches all posts from the contract.
   */
  const getPosts = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(wallet);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const count = await contract.getPostsCount();
      // setPostsCount(count);
      const fetchedPosts = [];
      for (let i = 0; i < count; i++) {
        const post = await contract.getPost(i);
        const comments = [];
        for (let j = 0; j < post.commentsCount; j++) {
          const comment = await contract.getComment(i, j);
          comments.push(comment);
        }

        fetchedPosts.push({ ...post, comments });
        setPosts(fetchedPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [contractABI, contractAddress]);

  useEffect(() => {
    getPosts();
  }, [PostsCount, address, getPosts]);

  /**
   * Likes a post.
   * @param {bigint} postId - The ID of the post to like.
   */
  const like = async (postId: bigint) => {
    try {
      await likePost({
        functionName: "likePost",
        args: [postId],
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        text: `Post liked!`,
        showConfirmButton: true,
        timer: 4000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error(error);
    }
  };

  /**
   * Adds a comment to a post.
   * @param {bigint} postId - The ID of the post to comment on.
   * @param {string} comment - The comment text.
   */
  const AddComment = async (postId: bigint, comment: string) => {
    try {
      await addComment({
        functionName: "addComment",
        args: [postId, comment],
      });

      setCommentText(prevState => ({
        ...prevState,
        [Number(postId)]: "",
      }));

      Swal.fire({
        position: "top-end",
        icon: "success",
        text: `Comment added!`,
        showConfirmButton: true,
        timer: 4000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handles the change event for the comment input field.
   * @param {number} index - The index of the post being commented on.
   * @param {string} value - The comment text.
   */
  const handleCommentChange = (index: number, value: string) => {
    setCommentText(prevState => ({
      ...prevState,
      [index]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-5">
      {/* navbar section */}
      <nav className="bg-dark-100 shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-blue-500" style={{ fontSize: "30px" }}>
            Social Media
          </h1>
          <div className="flex space-x-4">
            {registeredUser && (
              <div className="nav-item">
                {/* <button disabled className="btn btn-warning"> {registeredUser.userAddress.slice(0, 6)}...</button> */}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* registration section  */}
      {!registeredUser && (
        <div className="mt-3 flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow rounded-lg p-6">
              <h5 className="text-lg font-semibold mb-4">Create Account</h5>
              <div className="mb-3">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center" onClick={Register}>
                <FaUserPlus className="mr-2" />
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* create post section */}
      {registeredUser && (
        <div className="mt-3 flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow rounded-lg p-6">
              <h5 className="text-lg font-semibold mb-4">Create Post</h5>
              <div className="mb-3">
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                ></textarea>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center" onClick={CreatePost}>
                <FaPlus className="mr-2" />
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* post section */}
      <div className="mt-3" style={{ margin: "20px" }}>
        <h3 className="text-2xl font-semibold mb-4">All Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post: any, index: number) => (
            <motion.div
              className="mb-3"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white shadow rounded-lg p-4">
                <div className="mb-4">
                  <h6 className="text-sm font-medium text-gray-500">Author: {post.author.toString()}</h6>
                  <p className="text-gray-700">{post.content}</p>
                  <p className="text-gray-700">
                    Likes{" "}
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm">
                      {post.likes.toString()}
                    </span>
                  </p>
                </div>
                {registeredUser && (
                  <>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg m-2 flex items-center"
                      onClick={() => like(BigInt(index))}
                    >
                      <FaThumbsUp className="mr-2" />
                      Like
                    </button>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg m-2"
                      placeholder="Add a comment..."
                      value={commentText[index] || ""}
                      onChange={e => handleCommentChange(index, e.target.value)}
                    />
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center"
                      onClick={() => AddComment(BigInt(index), commentText[index] || "")}
                    >
                      <FaComment className="mr-2" />
                      Comment
                    </button>
                  </>
                )}
                {/* Comments */}
                <div className="mt-3">
                  <h5 className="text-lg font-semibold">Comments</h5>
                  {post.comments?.map((comment: any, commentIndex: number) => (
                    <div key={commentIndex} className="mb-2">
                      <span className="text-indigo-500">{`${comment.commenter.slice(0, 6)}...${comment.commenter.slice(
                        comment.commenter.length - 4,
                      )}`}</span>
                      <br />
                      <span className="text-blue-500">{comment.content}</span>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-5">{/* <img src={logo} alt="Logo" className="img-fluid" /> */}</div>
    </div>
  );
};

export default SocialMedia;
