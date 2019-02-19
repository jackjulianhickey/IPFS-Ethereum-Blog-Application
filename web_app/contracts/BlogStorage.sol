pragma solidity 0.5.0;


contract BlogStorage {

    struct Post {
        uint id;
        string ipfsHash;
        string name;
        address creator;
    }

    struct User {
        uint id;
        string email;
        address creator;
        uint postCount;
        bool registered;
        uint num_following;
        mapping(uint => uint) postIDs;
        mapping(uint => address) following;
    }

    mapping(uint => Post) public posts;

    mapping(address => User) public users;

    mapping(address => bool) public registered;

    uint public numUsers;

    uint public postsCount;

    function addPost(string memory _ipfsHash, string memory _name) public{
        postsCount++;
        uint numUserPosts = users[msg.sender].postCount++;
        posts[postsCount] = Post(postsCount, _ipfsHash, _name, msg.sender);
        users[msg.sender].postIDs[numUserPosts] = postsCount;
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

    function getUserPostID(uint postNum) public view returns (uint) {
        uint postID = users[msg.sender].postIDs[postNum];
        return postID;
    }


    function addUser(string memory _email) public payable returns (bool){
        require(!users[msg.sender].registered);
        require((uint(keccak256(abi.encodePacked(users[msg.sender].email)))) != (uint(keccak256(abi.encodePacked(_email)))));

        users[msg.sender] = User(numUsers, _email, msg.sender, 0, true, 0);
        return true;
    }

    function getNumUserPosts() public view returns (uint) {
        return users[msg.sender].postCount;
    }

    function signIn(string memory _email) public view returns (bool) {
        require(users[msg.sender].registered);
        require((uint(keccak256(abi.encodePacked(users[msg.sender].email)))) == (uint(keccak256(abi.encodePacked(_email)))));

        return true;

    }

    function newPost(uint _postID) public{
        users[msg.sender].postCount++;
        users[msg.sender].postIDs[users[msg.sender].postCount] = _postID;
    }

}
