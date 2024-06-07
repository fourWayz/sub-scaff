/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  11155111: {
    Social: {
      address: "0xB52fC2785a71693D895A81576990414A59E40780",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "commenter",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "postId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "CommentAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "author",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "PostCreated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "liker",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "postId",
              type: "uint256",
            },
          ],
          name: "PostLiked",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "username",
              type: "string",
            },
          ],
          name: "UserRegistered",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_postId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_content",
              type: "string",
            },
          ],
          name: "addComment",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_content",
              type: "string",
            },
          ],
          name: "createPost",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllPosts",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "author",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "content",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "likes",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "commentsCount",
                  type: "uint256",
                },
              ],
              internalType: "struct Social.Post[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_postId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_commentId",
              type: "uint256",
            },
          ],
          name: "getComment",
          outputs: [
            {
              internalType: "address",
              name: "commenter",
              type: "address",
            },
            {
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_postId",
              type: "uint256",
            },
          ],
          name: "getPost",
          outputs: [
            {
              internalType: "address",
              name: "author",
              type: "address",
            },
            {
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "likes",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "commentsCount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getPostsCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_userAddress",
              type: "address",
            },
          ],
          name: "getUserByAddress",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "username",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "isRegistered",
                  type: "bool",
                },
              ],
              internalType: "struct Social.User",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_postId",
              type: "uint256",
            },
          ],
          name: "likePost",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "postComments",
          outputs: [
            {
              internalType: "address",
              name: "commenter",
              type: "address",
            },
            {
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "postCommentsCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "posts",
          outputs: [
            {
              internalType: "address",
              name: "author",
              type: "address",
            },
            {
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "likes",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "commentsCount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_username",
              type: "string",
            },
          ],
          name: "registerUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "users",
          outputs: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            {
              internalType: "bool",
              name: "isRegistered",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
