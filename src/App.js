import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";

import Home from "./Pages/Home";
import Navigation from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Component } from "react";
import Verify from "./Pages/Verify";
import Request from "./Pages/Request";
import { CHARITY_ADDRESS, CHARITY_ABI } from "./config";

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData();
    this.connectWallet();
  }

  async connectWallet() {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((add) => {
        // Return the address of the wallet
        this.state.wallet = add.toString();
        console.log(this.state.wallet);
      });
    } else {
      alert("install metamask extension!!");
    }
  }

  async loadBlockchainData() {
    // console.log(Web3.givenProvider)
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // console.log(CHARITY_ABI, CHARITY_ADDRESS);
    const charityList = new web3.eth.Contract(CHARITY_ABI, CHARITY_ADDRESS);
    // console.log(charityList, "charityList");
  }

  constructor(props) {
    super(props);
    this.state = { account: "", wallet: "" };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation wallet={this.state.wallet}  />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/request" element={<Request />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
