pragma solidity 0.5.0;

contract Login {

    struct Post {
        uint userPostId;
        uint postId;
    }

    struct User {
        uint id;
        string email;
        string name;
        address creator;
        uint postCount;
        uint [] postIDs;
    }



    mapping(address => User) public users;

    uint public numUsers;

    function addUser(string memory _email, string memory _name) public payable returns (bool){
        User memory user = users[msg.sender];

        require(user.creator != msg.sender);

        require((uint(keccak256(abi.encodePacked(user.email)))) != (uint(keccak256(abi.encodePacked(_email)))));

        users[msg.sender] = User(numUsers, _email, _name, msg.sender, 0, new uint[](0));
        return true;
    }

    function getNumUserPosts() public view returns (uint) {
        User memory user = users[msg.sender];
        uint numPosts = user.postCount;
        return numPosts;
    }

    function signIn(string memory _email) public view returns (bool) {
        User memory user = users[msg.sender];

        require((uint(keccak256(abi.encodePacked(user.email)))) == (uint(keccak256(abi.encodePacked(_email)))));

        require(msg.sender == user.creator);

        return true;

    }

    function newPost(uint _postID) public view{
        User memory user = users[msg.sender];
        user.postCount++;
        user.postIDs[user.postCount] = _postID;
    }

}
