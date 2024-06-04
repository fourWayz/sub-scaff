import { expect } from "chai";
import { ethers } from "hardhat";
import { Social } from "../typechain-types";

describe("Social", function () {
  // We define a fixture to reuse the same setup in every test.

  let social: Social;
  let user1: any;
  let user2: any;

  before(async () => {
    [user1, user2] = await ethers.getSigners();
    const socialFactory = await ethers.getContractFactory("Social");
    social = (await socialFactory.deploy()) as Social;
    await social.waitForDeployment();
  });

  it("should register a user", async function () {
    const username = "user1";

    await social.connect(user1).registerUser(username);
    const user = await social.users(user1.address);

    expect(user.username).to.equal(username);
    expect(user.userAddress).to.equal(user1.address);
    expect(user.isRegistered).to.be.true;
  });

  it("should create a post", async function () {
    const content = "This is a test post";
    await social.connect(user1).createPost(content);
    const postsCount = await social.getPostsCount();
    expect(postsCount.toString()).to.equal("1");

    const post = await social.getPost(0);
    expect(post.author).to.equal(user1.address);
    expect(post.content).to.equal(content);
    expect(post.likes.toString()).to.equal("0");
    expect(post.commentsCount.toString()).to.equal("0");
  });

  it("should like a post", async function () {
    await social.connect(user2).registerUser("user2");
    await social.connect(user2).likePost(0);
    const post = await social.getPost(0);
    expect(post.likes.toString()).to.equal("1");
    expect(post.author).to.equal(user1.address);
  });

  it("should add a comment to a post", async function () {
    // const content = 'This is a test post';
    const commentContent = "This is a test comment";

    await social.connect(user2).addComment(0, commentContent);

    const comment = await social.getComment(0, 0);
    expect(comment.commenter).to.equal(user2.address);
    expect(comment.content).to.equal(commentContent);

    const post = await social.getPost(0);
    expect(post.commentsCount.toString()).to.equal("1");
  });

  it("should return correct user details by address", async function () {
    const userDetails = await social.getUserByAddress(user1.address);
    expect(userDetails.userAddress).to.equal(user1.address);
    expect(userDetails.isRegistered).to.equal(true);
  });
});
