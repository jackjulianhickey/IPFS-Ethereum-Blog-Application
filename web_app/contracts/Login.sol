pragma solidity 0.5.0;

contract Login {
    struct User {
        uint id;
        string email;
        string name;
        address creator;
        uint postCount;
        uint[] postIDs;
    }

    mapping(address => User) public users;

    uint public numUsers;

    function addUser(string memory _email, string memory _name) public payable {
        numUsers++;
        uint[] memory postIDs;
        users[msg.sender] = User(numUsers, _email, _name, msg.sender, 0, postIDs);
    }

    function getNumUserPosts() public view returns (uint) {
        User memory user = users[msg.sender];
        uint numPosts = user.postCount;
        return numPosts;
    }

    function signIn(string memory _email) public view returns (bool) {
        User memory user = users[msg.sender];

        if (user.creator != msg.sender) {
            return false;
        }

        if ((uint(keccak256(abi.encodePacked(user.email)))) == (uint(keccak256(abi.encodePacked(_email))))) {
            return true;
        }

        return false;

    }

    function newPost(uint _postID) public view{
        User memory user = users[msg.sender];
        user.postCount++;
        user.postIDs[user.postCount] = _postID;
    }

}
