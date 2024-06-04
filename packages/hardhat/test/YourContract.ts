import { expect } from "chai";
import { ethers } from "hardhat";
import { Social } from "../typechain-types";

describe("Social", function () {
  // Define variables to hold the contract instance and user accounts
  let social: Social;
  let user1: any;
  let user2: any;

  // Before running tests, deploy the contract and get user signers
  before(async () => {
    [user1, user2] = await ethers.getSigners();
    const socialFactory = await ethers.getContractFactory("Social");
    social = (await socialFactory.deploy()) as Social;
    await social.waitForDeployment();
  });

  // Test case for registering a user
  it("should register a user", async function () {
    const username = "user1";

    await social.connect(user1).registerUser(username);
    const user = await social.users(user1.address);

    // Verify the user details after registration
    expect(user.username).to.equal(username);
    expect(user.userAddress).to.equal(user1.address);
    expect(user.isRegistered).to.be.true;
  });

  // Test case for creating a post
  it("should create a post", async function () {
    const content = "This is a test post";
    await social.connect(user1).createPost(content);
    const postsCount = await social.getPostsCount();

    // Verify the post count and post details
    expect(postsCount.toString()).to.equal("1");

    const post = await social.getPost(0);
    expect(post.author).to.equal(user1.address);
    expect(post.content).to.equal(content);
    expect(post.likes.toString()).to.equal("0");
    expect(post.commentsCount.toString()).to.equal("0");
  });

  // Test case for liking a post
  it("should like a post", async function () {
    await social.connect(user2).registerUser("user2");
    await social.connect(user2).likePost(0);
    const post = await social.getPost(0);

    // Verify the like count and post details after liking the post
    expect(post.likes.toString()).to.equal("1");
    expect(post.author).to.equal(user1.address);
  });

  // Test case for adding a comment to a post
  it("should add a comment to a post", async function () {
    const commentContent = "This is a test comment";

    await social.connect(user2).addComment(0, commentContent);

    const comment = await social.getComment(0, 0);

    // Verify the comment details
    expect(comment.commenter).to.equal(user2.address);
    expect(comment.content).to.equal(commentContent);

    const post = await social.getPost(0);

    // Verify the comment count on the post
    expect(post.commentsCount.toString()).to.equal("1");
  });

  // Test case for fetching user details by address
  it("should return correct user details by address", async function () {
    const userDetails = await social.getUserByAddress(user1.address);

    // Verify the user details
    expect(userDetails.userAddress).to.equal(user1.address);
    expect(userDetails.isRegistered).to.equal(true);
  });
});
