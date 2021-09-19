import React, { Component } from "react";
import { useState } from "react";
import { ethers } from 'ethers';
import Blockchase from "./contracts/Blockchase.json";
import evaderLogo from "./letter_e.png";
import pursuerLogo from "./letter_p.png";
//import Gameboard from "./Components/Gameboard";
//import getWeb3 from "./getWeb3";
import "./App.css";

const blockchaseAddress = "0x496116336d4c49BF40CCFCAD9C5f26E5215a4Ebe"




  //const [evaderIndex, setEvaderIndex] = useState()
  //const [pursuerIndex, setPursuerIndex] = useState()

  //const[match, setMatch] = useState(false)

  // request access to the user's MetaMask account
  function App() {
  
    const [value, setValue] = useState(0)
    const [move, setMove] = useState(0)
    const [salt, setSalt] = useState(0)
  
    const [deposit, setDeposit] = useState(0)
    const [commit, setCommit] = useState("0x95ae12afd4213bddb0c0d704b7c10c382538e4ac00e319ace9fca492aaf6d1ea")
    const [team, setTeam] = useState("")
  
    //const [hash, setHash] = useState()
  
    const [revealvalue, setRevealValue] = useState(0)
    const [revealmoves, setRevealmove] = useState(0)
    const [revealsalts, setRevealsalt] = useState(0)

    const [evaderIndex, setEvaderIndex] = useState(44)
    const [pursuerIndex, setPursuerIndex] = useState(0)

    //const [renderCount, setRenderCount] = useState(0)

    const [gameID, setgameID] = useState(1)
    const [gameRound, setGameRound] = useState(1)

    const [fetchEvaderIndex, setFetchEvaderIndex] = useState()
    const [fetchPursuerIndex, setFetchPursuerIndex] = useState()
    const [hash, setHash] = useState()
    const [stage, setStage] = useState()

    async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts'});
    }
  
    async function evaderFetchIndex() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, provider)
        try {
          const evaderIndex = await contract.getCurrentEvaderIndex()
          console.log('index: ', evaderIndex)
          setFetchEvaderIndex(evaderIndex)
  
        } catch (err) {
          console.log("Error: ", err)
        }
      }
    }
  
    async function pursuerFetchIndex() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, provider)
        try {
          const pursuerIndex = await contract.getCurrentPursuerIndex()
          console.log('index: ', pursuerIndex)
          setFetchPursuerIndex(pursuerIndex)
  
        } catch (err) {
          console.log("Error: ", err)
        }
      }
    }
  
    async function getHash() {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log( {provider} )
        //const signer = provider.getSigner()
        const contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, provider)
        const transaction = await contract.getSaltedHash(value, move, salt)
        console.log({transaction})
        setHash(transaction)
        //const type = typeof hash
        //console.log({transaction})
      }
    }
  
    async function getStages() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, provider)
        try {
          const stages = await contract.getStage()
          setStage(stages)
          console.log('Stage: ', stage)
        } catch (err) {
          console.log("Error: ", err)
        }
      }
    }
  
  /*  async function generateHash(){
      if (typeof window.ethereum !== "undefined") {
        const hash = ethers.utils.solidityKeccak256(['uint256', 'uint8', 'uint256'], [value, move, salt])
        const type = typeof hash
        console.log({type})      
      }
      return hash
    }*/
  
    async function submitBids() {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log( {provider} )
        const signer = provider.getSigner()
        console.log( {signer} )
        const stringDepo = deposit.toString()
        console.log({stringDepo})
        const overrides = {
          value : ethers.utils.parseEther(stringDepo),
          gasLimit: 2000000
        }
        //commit = new String(commit)
        //commit = instance
        console.log({overrides})
        const contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, signer)
        const transaction = await contract.submitBid(commit, team, overrides)
        await transaction.wait()
        console.log({transaction})
      }
    }
  
    async function revealBids() {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log( {provider} )
        const signer = provider.getSigner()
        const contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, signer)
        const valuearray = [revealvalue]
        const movearray = [revealmoves]
        const saltarray = [revealsalts]
        const transaction = await contract.reveal(valuearray, movearray, saltarray)
        await transaction.wait()
        console.log({transaction})    
    }
  }

    async function forceEndAuction() {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log( {provider} )
        const signer = provider.getSigner()
        const contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, signer)
        const transaction = await contract.forceEndAuctionWhenInsufficientReveals()
        await transaction.wait()
    }
  }
  
  /*  function updateEvaderIndex() {
      if (evaderIndex !== evaderFetchIndex()){
        setEvaderIndex(evaderFetchIndex())
        setMatch(false)
        return match
        
      }
      
      return match
  
    }
    
    function updatePursuerIndex() {
      if (pursuerIndex !== pursuerFetchIndex()){
        setPursuerIndex(pursuerFetchIndex())
        setMatch(false)
        return match
        
      }
      return match
    } */
    
  
  
   // let pursuerIndex = pursuerFetchIndex()
   // console.log(pursuerIndex)
  
    //const val = evaderFetchIndex().then(val => console.log(val))
    //console.log("val: ", val)
    //const val2 = pursuerFetchIndex().then(val2 => console.log(val2))
    //console.log("evaderIndex", currentEvaderIndex)
    //const currentPursuerIndex = pursuerFetchIndex().then(() => console.log(currentPursuerIndex))
  
  function Gameboard(evader, pursuer) {
  
    const verticalAxis = [0, 1, 2, 3, 4, 5, 6 , 7 , 8 , 9];
    const horizontalAxis = [0, 1, 2, 3, 4, 5, 6 , 7 , 8 , 9];
    //console.log("Evader: ",typeof evader)
    //console.log("Pursuer: ",typeof pursuer)
  
        
  //    const [stateboard, setBoard] = useState([])
  //    const [evaderIndex, setEvader] = useState(0)
  //    const [pursuerIndex, setPursuer] = useState(0)
  
  
  //    const [evaderMatch, setEvaderMatch] = useState(true)
  //    const [pursuerMatch, setPursuerMatch] = useState(true)
  
  /*    if (evaderIndex != evader) {
          setEvaderMatch(false)
      } else {
          setEvaderMatch(true)
      }
  
      
      if (pursuerIndex != pursuer) {
          setPursuerMatch(false)
      } else {
          setPursuerMatch(true)
      }*/
  
      //setEvader(evader)
      //setPursuer(pursuer)
  
    const board = []
    for (let j = verticalAxis.length - 1; j >= 0; j--){
        for (let i = 0 ; i < horizontalAxis.length; i++){
            
            let boxId = j.toString() + i.toString();
            boxId = Number(boxId)
            if (j ===0){
                


              if (boxId === pursuer){
                board.push(
                    <div className = "box"> 
                    <img src = {pursuerLogo} alt ="pursuer"/>
                    </div>
                )
            }
              else if (boxId === evader){
                    board.push(
                        <div className = "box"> 
                        <img src = {evaderLogo} alt ="evader"/>
                        </div>
                    )
                }
  
  
                else {
                    board.push(
                        <div className = "box"> 
  
                        </div>
                    )
                }
  
            }
            else{


              if (boxId === pursuer){
                board.push(
                    <div className = "box"> 
                    <img src = {pursuerLogo} alt ="pursuer"/>
                    </div>
                )
            }
            
            
              else if (boxId === evader){
                    board.push(
                        <div className = "box"> 
                        <img src = {evaderLogo} alt ="evader"/>
                        </div>
                    )
                }
  

  
                else {
                    board.push(
                        <div className = "box"> 
  
                        </div>
                    )
                }
            }
        }
    }

    return <div id = "gameboard">{board}</div>;
  }

  if (typeof window.ethereum !== 'undefined') {
    requestAccount()
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, provider)

    let filterFromGameIDandGameRoundEvader = contract.filters.EvaderMove(gameID, gameRound)
    let filterFromGameIDandGameRoundPursuer = contract.filters.PursuerMove(gameID, gameRound)


    contract.on(filterFromGameIDandGameRoundEvader, (gameIDs, gameRounds, previousEvaderIndex, currentEvaderIndex) => {
      
      setEvaderIndex(currentEvaderIndex)
      //console.log(previousEvaderIndex)
      //console.log(currentEvaderIndex)
      
    })

    contract.on(filterFromGameIDandGameRoundPursuer, (gameIDs, gameRounds, previousPursuerIndex, currentPursuerIndex) => {
      
      setPursuerIndex(currentPursuerIndex)
      //console.log(previousPursuerIndex)
      //console.log(currentPursuerIndex)
      setGameRound(gameRound + 1)
      console.log(gameRound)
      
    })

}

  if (typeof window.ethereum !== 'undefined') {
    requestAccount()
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let contract = new ethers.Contract(blockchaseAddress, Blockchase.abi, provider)

    let filterFromGameID = contract.filters.NewGame(gameID)
    contract.on(filterFromGameID, (previousgameID) => {
      setgameID(gameID+1)
      setPursuerIndex(0)
      setEvaderIndex(11)
      console.log(gameID)
    })
  } 

  //console.log(gameID)
  //console.log(gameRound)


  return (
    <div className="App">
      <header className="App-header">
        <p><button onClick={evaderFetchIndex}>Fetch Evader Index</button>     Evader Index: {fetchEvaderIndex} </p>
        <p><button onClick={pursuerFetchIndex}>Fetch Pursuer Index </button>     Pursuer Index: {fetchPursuerIndex}</p>
        <p><button onClick={getHash}>Get Salted Hash</button>
        <input onChange={e => setValue(e.target.value)} placeholder="Your Bid Value" />
        <input onChange={e => setMove(e.target.value)} placeholder="Your Move" />
        <input onChange={e => setSalt(e.target.value)} placeholder="Your Salt" /> Salted Hash: {hash} </p>
        <p><button onClick={submitBids}>Submit Bids</button>
        <input onChange={e => setDeposit(e.target.value)} placeholder="Your Deposit" />
        <input onChange={e => setCommit(e.target.value)} placeholder="Your Commit" />
        <input onChange={e => setTeam(e.target.value)} placeholder="Your Team" /></p>
        <p><button onClick={getStages}>Get Stage</button>     Stage: {stage}</p>
        <button onClick={revealBids}>Reveal Bids</button>
        <input onChange={e => setRevealValue(e.target.value)} placeholder="Your Reveal Bid Value" />
        <input onChange={e => setRevealmove(e.target.value)} placeholder="Your Reveal Move" />
        <input onChange={e => setRevealsalt(e.target.value)} placeholder="Your Reveal Salt" />
        <p><button onClick={forceEndAuction}>Force End Auction</button></p>
      </header>
        <br />
        <br /> 
      <div id = "board">
      {Gameboard(evaderIndex, pursuerIndex)}
      </div>
    </div>
  );

}

export default App;
