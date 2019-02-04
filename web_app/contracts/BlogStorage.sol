pragma solidity 0.5.0;

contract BlogStorage {

    struct Post {
        uint id;
        string ipfsHash;
        string name;
        address creator;
    }

    mapping(uint => Post) public posts;

    uint public postsCount;

    function addPost(string memory _ipfsHash, string memory _name) public {
        postsCount++;
        posts[postsCount] = Post(postsCount, _ipfsHash, _name, msg.sender);
    }

    function confirmAdded() public view returns (string memory) {
        Post memory newPost = posts[postsCount];
        string memory ipfsHash = newPost.ipfsHash;
        return ipfsHash;

    }

    function getPostCount() public view returns (uint) {
        return postsCount;
    }

    function getPostHash(uint postId) public view returns (string memory) {
        return posts[postId].ipfsHash;
    }

    function getPostName(uint postId) public view returns (string memory) {
        return posts[postId].name;
    }
}
