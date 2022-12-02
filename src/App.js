import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import { Component } from "react";
import Home from "./Pages/Home";
import Navigation from "./Components/Navbar";
import Verify from "./Pages/Verify";
import Request from "./Pages/Request";
import MyRequest from "./Pages/MyRequest";
import Donate from "./Pages/Donate";
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
            resolve(Web3.utils.toChecksumAddress(add[0]));
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
    // const web3 = new Web3("http://localhost:7545");
    const web3 = new Web3(window.ethereum);
    console.log(web3);
    const accounts = await web3.eth.getAccounts();
    this.setState({
      contract: new web3.eth.Contract(CHARITY_ABI, CHARITY_ADDRESS),
    });
    this.setState({ loaded: true });
  }

  setWalletAdd(address) {
    this.setState({ account: address });
    localStorage.setItem("account", this.state.account);
  }

  constructor(props) {
    super(props);
    this.connectWallet = this.connectWallet.bind(this);
    this.getWalletAdd = this.getWalletAdd.bind(this);
    this.setWalletAdd = this.setWalletAdd.bind(this);
    this.state = {
      account: "",
      contract: {},
      loaded: false,
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation
            connectWallet={this.connectWallet}
            getWalletAdd={this.getWalletAdd}
            setWalletAdd={this.setWalletAdd}
            contract={this.state.contract}
            account={this.state.account}
            loaded={this.state.loaded}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  contract={this.state.contract}
                  account={this.state.account}
                  loaded={this.state.loaded}
                />
              }
            />

            <Route
              path="/verify"
              element={
                <Verify
                  contract={this.state.contract}
                  account={this.state.account}
                  loaded={this.state.loaded}
                />
              }
            />
            <Route
              path="/request"
              element={
                <Request
                  contract={this.state.contract}
                  account={this.state.account}
                  loaded={this.state.loaded}
                />
              }
            />
            <Route
              path="/myrequest"
              element={
                <MyRequest
                  contract={this.state.contract}
                  account={this.state.account}
                  loaded={this.state.loaded}
                />
              }
            />
            <Route
              path="/donate"
              element={
                <Donate
                  contract={this.state.contract}
                  account={this.state.account}
                  loaded={this.state.loaded}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
