import React, { Component } from 'react';
import TruffleContract from 'truffle-contract'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './components/pages/homepage/Homepage'
import NewBlog from './components/pages/new_blog/NewBlog'
import {ViewBlog} from './components/pages/view_blog/ViewBlog'
import Userpage from './components/pages/user_page/Userpage'
import Header from './components/pages/layout/Header'
import BlogStorageContract from './contracts/BlogStorage'
import LoginContract from './contracts/Login';
import Login from './components/pages/login/Login';
import ipfs from './IPFS';
import './App.css';
import Web3 from "web3";

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      contract: null,
      web3: null,
      accounts: null,
      loading: false,
      userBlogs: [],
      followingBlogs: [],
      userPostsNum: null,
      viewBlogHash: null,
      viewBlogData: null,
      login: false
    };

    let web3 = window.web3;

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)
    this.BlogStorageContract = TruffleContract(BlogStorageContract)
    this.BlogStorageContract.setProvider(this.web3Provider)
    this.LoginContract = TruffleContract(LoginContract)
    this.LoginContract.setProvider(this.web3Provider)

  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      console.log(account)
      this.BlogStorageContract.deployed().then((BlogStorageInstance) => {
        this.BlogStorageInstance = BlogStorageInstance;
        this.BlogStorageInstance.getNumUserPosts({from: account}).then((numPostsCount) => {
          console.log(numPostsCount.toNumber());
          this.setState({userPostsNum: numPostsCount.toNumber()});
          console.log(this.state.userPostsNum);
          this.getUserPosts(numPostsCount);
          this.getFollowingPosts();
        });
      });
      this.LoginContract.deployed().then((LoginInstance) => {
        this.LoginInstance = LoginInstance;
      })
    });
  }

  userLogin = async (email) => {
    console.log(email)
    if(await this.BlogStorageInstance.signIn(email)) {
      console.log("User Signed In");
      this.setState({login: true})
      return
    }
    console.log("Failed")
  }

  userSignUp = async (email) => {
    console.log(email)
    const { account } = this.state;
    if(await this.BlogStorageInstance.addUser(email, {from: account})) {
      console.log("User Signed In");
      this.setState({login: true})
      return
    }
    console.log("Failed")
  }

  getUserPosts =  async (numPosts) => {
    console.log(numPosts.toNumber())
    for (let i = numPosts.toNumber()-1; i >= 0; i--) {
      let blogObj = {};
      this.BlogStorageInstance.getUserPostID(i).then( async (blogId) => {
        console.log(blogId.toNumber())
        blogObj.id = blogId.toNumber();

        await this.BlogStorageInstance.getPostHash(blogId.toNumber()).then(async (blogHash) => {
            console.log(blogHash)
            blogObj.hash = blogHash;
          });

        await this.BlogStorageInstance.getPostName(blogId.toNumber()).then(async (blogTitle) => {
          console.log(blogTitle)
          blogObj.title = blogTitle;
          console.log("blog", blogObj.id, blogObj.hash, blogObj.title)
          this.setState({
            userBlogs: [...this.state.userBlogs, blogObj] })

        })

      });

    }

  }

  getFollowingPosts =  async () => {

    this.BlogStorageInstance.getNumFollowing().then( async (numFollowing) => {
      this.BlogStorageInstance.getAddressFollowing(numFollowing).then( async (address) => {
        let followingBlog = {};
        await this.BlogStorageInstance.getFollowingPostID(address).then( async (blogID) => {
          followingBlog.id = blogID.toNumber();
          console.log(blogID.toNumber())
        });

        await this.BlogStorageInstance.getPostHash(1).then(async (blogHash) => {
          console.log(blogHash)
          followingBlog.hash = blogHash;
        });

        await this.BlogStorageInstance.getPostName(1).then(async (blogTitle) => {
          console.log(blogTitle)
          followingBlog.title = blogTitle;
          console.log("blog", followingBlog.id, followingBlog.hash, followingBlog.title)
          this.setState({
            followingBlogs: [...this.state.followingBlogs, followingBlog] })

        })
      })
    });

  }

  numPosts =  () => {
    let numPosts = this.BlogStorageInstance.getPostCount();
    return numPosts;
  }

  addBlog = async (title, blog) => {
    // TODO add blog to IPFS and Ethereum

    let buffer = await Buffer.from(blog);
    console.log("buffer: ", buffer);

    ipfs.files.add(buffer, async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(result)

      const { account } = this.state;

      await this.BlogStorageInstance.addPost(result[0].hash, title, {from: account}).then( async (blogId) => {
        // await this.LoginInstance.newPost(blogId, {from: account});
        console.log(blogId);
        let blog = {id: blogId, hash: result[0].hash, title};
        this.setState({
          userBlogs: [...this.state.userBlogs, blog]
        })
      });

    });
  }

  selectedBlogPost = async (blogHash) => {
    this.setState({viewBlogHash: blogHash})
    let testHash = "/ipfs/" + blogHash;

    ipfs.cat(blogHash, async (err, file) => {
      if(err){
        console.log(err)
      } else {
        console.log(file)
        this.setState({viewBlogData: file.toString()})
      }

    })

  }

  render() {
    {
      if (this.state.loading) {
        return (
          <h1>Loading</h1>);
      }
      else if (!this.state.login){
        return (
          <Login login={this.userLogin} signUp={this.userSignUp}/>
        )
      }
      else {
        return (
          <Router>
            <div className={"App"}>
              <div className={"container"}>
                <Header/>
                <Route exact path={"/"} render={props => (
                  <React.Fragment>
                    <Homepage followingBlogs={this.state.followingBlogs} selectedBlog={this.selectedBlogPost}/>
                  </React.Fragment>
                )}/>
                <Route path="/newblog" render={props => (
                  <React.Fragment>
                    <NewBlog addBlog={this.addBlog}/>
                  </React.Fragment>
                )}/>
                <Route path={"/viewblog"} render={props => (
                  <React.Fragment>
                    <ViewBlog viewBlogData={this.state.viewBlogData}/>
                  </React.Fragment>
                )}/>
                <Route exact path={"/mypage"} render={props => (
                  <React.Fragment>
                    <Userpage userBlogs={this.state.userBlogs} selectedBlog={this.selectedBlogPost}/>
                  </React.Fragment>
                )}/>
              </div>
            </div>
          </Router>
        );
      }
    }
  }
}

export default App;

const loginStyle = {
  background: '#5B5B5B',
  margin: '0',
  height: '100%'
}
