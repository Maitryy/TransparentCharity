import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import { Component } from "react";
import Home from "./Pages/Home";
import Navigation from "./Components/Navbar";
import Verify from "./Pages/Verify";
import Request from "./Pages/Request";
import Detail from "./Pages/Detail";
import MyRequest from "./Pages/MyRequest";
import { CHARITY_ADDRESS, CHARITY_ABI } from "./config";

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData();
  }

  async connectWallet() {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((add) => {
            this.state.wallet = add.toString();
            resolve(this.state.wallet);
          })
          .catch((err) => {
            alert("couldn't connect!");
            reject("");
          });
      } else {
        alert("install metamask extension!!");
        reject("");
      }
    });
  }

  getWalletAdd() {
    return this.state.wallet;
  }

  async loadBlockchainData() {
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.state.contract = new web3.eth.Contract(CHARITY_ABI, CHARITY_ADDRESS);

    await this.state.contract.methods
      .unverifiedRequestsLength()
      .call()
      .then((val) => {
        this.state.unverifiedReqLength = parseInt(val);
      });
    await this.state.contract.methods
      .verifiedRequestsLength()
      .call()
      .then((val) => {
        this.state.verifiedReqLength = parseInt(val);
      });
    await this.state.contract.methods
      .verifierLength()
      .call()
      .then((val) => {
        this.state.verifierLength = parseInt(val);
      });
    if (this.state.verifierLength !== 0) {
      for (let i = 0; i < this.state.verifierLength; ++i) {
        // let tmp = await this.state.contract.methods.verifiers(i).call();
        // console.log("tmp:", tmp);
        // this.state.verifiers.push(tmp);
        this.state.contract.methods
          .verifiers(i)
          .call()
          .then((val) => {
            this.state.verifiers.push(val);
          });
        console.log("APP:", this.state);
      }
    }
    /*
    if (this.state.verifiedReqLength !== 0) {
      for (let i = 0; i < this.state.verifiedReqLength; ++i) {
        let tmp = await this.state.contract.methods.verifiedRequests(i).call();
        this.state.verifiedRequests.push(tmp);
      }
    }
    if (this.state.unverifiedReqLength !== 0) {
      for (let i = 0; i < this.state.unverifiedReqLength; ++i) {
        let tmp = await this.state.contract.methods
          .unverifiedRequests(i)
          .call();
        this.state.unverifiedRequests.push(tmp);
      }
    }
    */
  }

  constructor(props) {
    super(props);
    this.connectWallet = this.connectWallet.bind(this);
    this.getWalletAdd = this.getWalletAdd.bind(this);
    this.state = {
      account: "",
      wallet: "",
      contract: {},
      verifiedReqLength: 0,
      unverifiedReqLength: 0,
      verifierLength: 0,
      verifiedRequests: [],
      unverifiedRequests: [],
      verifiers: [],
      fetchData: false,
    };
  }

  render() {
    
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation
            connectWallet={this.connectWallet}
            getWalletAdd={this.getWalletAdd}
            verifiers={this.state.verifiers}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  contract={this.state.contract}
                  verifiedRequests={this.state.unverifiedRequests}
                  account={this.state.account}
                  fetchData={this.state.fetchData}
                />
              }
            />
            <Route
              path="/verify"
              element={<Verify contract={this.state.contract} />}
            />
            <Route
              path="/request"
              element={<Request contract={this.state.contract} />}
            />
            <Route
              path="/details"
              element={<Detail contract={this.state.contract} />}
            />
            <Route path="/myrequest" element={<MyRequest />} />
            
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
