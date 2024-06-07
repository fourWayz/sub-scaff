// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Social {
    // Address of the contract owner
    address public owner;

    // Struct representing a user
    struct User {
        string username;
        address userAddress;
        bool isRegistered;
    }

    // Mapping from user address to user details
    mapping(address => User) public users;

    // Struct representing a post
    struct Post {
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        uint256 commentsCount;
    }

    // Struct representing a comment
    struct Comment {
        address commenter;
        string content;
        uint256 timestamp;
    }

    // Mapping from post ID to comment ID to comment details
    mapping(uint256 => mapping(uint256 => Comment)) public postComments;

    // Mapping from post ID to count of comments
    mapping(uint256 => uint256) public postCommentsCount;

    // Array to store all posts
    Post[] public posts;

    // Event emitted when a user is registered
    event UserRegistered(address indexed userAddress, string username);

    // Event emitted when a post is created
    event PostCreated(address indexed author, string content, uint256 timestamp);

    // Event emitted when a post is liked
    event PostLiked(address indexed liker, uint256 indexed postId);

    // Event emitted when a comment is added
    event CommentAdded(address indexed commenter, uint256 indexed postId, string content, uint256 timestamp);

    // Modifier to restrict function access to registered users
    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User is not registered");
        _;
    }

    // Modifier to restrict function access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Constructor to set the owner of the contract to the deployer
    constructor() {
        owner = msg.sender;
    }

    // Function to register a new user
    function registerUser(string memory _username) external {
        require(!users[msg.sender].isRegistered, "User is already registered");
        require(bytes(_username).length > 0, "Username should not be empty");

        users[msg.sender] = User({
            username: _username,
            userAddress: msg.sender,
            isRegistered: true
        });

        emit UserRegistered(msg.sender, _username);
    }

    // Function to get user details by address
    function getUserByAddress(address _userAddress) external view returns (User memory) {
        require(users[_userAddress].isRegistered, "User not found");
        return users[_userAddress];
    }

    // Function to create a new post
    function createPost(string memory _content) external onlyRegisteredUser {
        require(bytes(_content).length > 0, "Content should not be empty");

        posts.push(Post({
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likes: 0,
            commentsCount: 0
        }));

        emit PostCreated(msg.sender, _content, block.timestamp);
    }

    // Function to like a post
    function likePost(uint256 _postId) external onlyRegisteredUser {
        require(_postId < posts.length, "Post does not exist");

        Post storage post = posts[_postId];
        post.likes++;

        emit PostLiked(msg.sender, _postId);
    }

    // Function to add a comment to a post
    function addComment(uint256 _postId, string memory _content) external onlyRegisteredUser {
        require(_postId < posts.length, "Post does not exist");
        require(bytes(_content).length > 0, "Comment should not be empty");

        uint256 commentId = postCommentsCount[_postId];
        postComments[_postId][commentId] = Comment({
            commenter: msg.sender,
            content: _content,
            timestamp: block.timestamp
        });

        postCommentsCount[_postId]++;
        posts[_postId].commentsCount++;

        emit CommentAdded(msg.sender, _postId, _content, block.timestamp);
    }

    // Function to get the count of posts
    function getPostsCount() external view returns (uint256) {
        return posts.length;
    }

    // Function to get details of a specific post
    function getPost(uint256 _postId) external view returns (
        address author,
        string memory content,
        uint256 timestamp,
        uint256 likes,
        uint256 commentsCount
    ) {
        require(_postId < posts.length, "Post does not exist");
        Post memory post = posts[_postId];
        return (post.author, post.content, post.timestamp, post.likes, post.commentsCount);
    }

	function getAllPosts() external view returns (Post[] memory){
		return posts;
	}

    // Function to get details of a specific comment on a post
    function getComment(uint256 _postId, uint256 _commentId) external view returns (
        address commenter,
        string memory content,
        uint256 timestamp
    ) {
        require(_postId < posts.length, "Post does not exist");
        require(_commentId < postCommentsCount[_postId], "Comment does not exist");

        Comment memory comment = postComments[_postId][_commentId];
        return (comment.commenter, comment.content, comment.timestamp);
    }
}
