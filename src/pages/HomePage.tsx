import { memo, useEffect, useState } from "react";
import { Button, Container } from "decentraland-ui";
import { IoMdWarning } from 'react-icons/io'
import { Navbar } from "../components/Navbar";
import { Auction } from "../components/Auction";
import { Tiles } from "../components/Tiles";
import { useAuction } from "../modules/auction";
import './HomePage.css'
import { AUCTION_HOUSE_CONTRACT_ADDRESS, EXODUS_DAO_CONTRACT_ADDRESS, TOWN_TOKEN_CONTRACT_ADDRESS, getContractUrl } from "../eth";

export const HomePage = memo(() => {

  const { auction, isSettled, isWinner } = useAuction()
  const [tokenId, setTokenId] = useState<string>()

  useEffect(() => {
    if (auction) {
      setTokenId(isSettled && !isWinner ? (Number(auction.tokenId) + 1).toString() : auction.tokenId)
    }
  }, [auction, isSettled, isWinner])

  return <>
    <Navbar />
    <Tiles tokenId={tokenId} setTokenId={setTokenId} />
    <div className="HomePage dcl page">
      <Container className="content">
        <Auction tokenId={tokenId} setTokenId={setTokenId} />
        <div className="content">
          <h1>Welcome to Exodus Town <Button primary className="jump-in" href="https://play.decentraland.org?realm=exodus.town"><span className="text">Jump In</span> <i className="jump-in-icon" /></Button></h1>

          <h3>The World</h3>
          <p>Exodus Town is an experiment on Decentraland Worlds, continuous issuance, and DAOs. Originating from the 0,0 coordinate, it expands in a never-ending spiral, growing one parcel per day, forever.</p>

          <h3>The Token</h3>
          <p>The TOWN token is a distinctive NFT for a couple of reasons. First, it allows its holder to publish content on Exodus Town parcels, akin to Decentraland's LAND token. Second, France. Third, the proceeds from TOWN auctions don't go to a developer team, instead they directly enter the Exodus DAO treasury, ensuring it stays in the hands of the token holders.</p>

          <h3>The Auction</h3>
          <p>Exodus Town features daily auctions in which one TOWN token is made available for purchase using MANA every 24 hours. This activity is not only about buying digital real estate but also about contributing to a community treasury. 100% of the proceeds from the auction go directly into the Exodus DAO.</p>

          <h3>The DAO</h3>
          <p>The Exodus Town governance is fully on-chain, based on <a href="https://docs.openzeppelin.com/contracts/4.x/api/governance#governor" target="_blank">OpenZeppelin's Governor</a>. This stands in contrast to snapshot-based DAOs. Here, each TOWN token is equivalent to one vote, and these votes directly control the treasury and any proposals, without requiring off-chain actions or human intervention.</p>

          <h3>The Editor</h3>
          <p>The Decentraland's Web Editor is integrated into Exodus Town, allowing content to be created and published directly onto parcels. The editor is open to everyone and doesn't require coding skills.</p>

          <h3>The Awakening</h3>
          <p>During its initial phase, the Exodus DAO enters a "sleeping period" to guard against potential 51% attacks, because of a low supply of TOWN tokens. While the DAO is designed to empower TOWN token holders, governance proposals are on hold until the token supply reaches the pivotal count of 100. Expected to unfold over approximately three months due to daily auctions, this milestone will trigger the "awakening" of the Exodus DAO, activating its full governance capabilities and allowing token holders to begin submitting proposals.</p>

          <h3>The Deployer</h3>
          <p>The Deployer of Exodus Town have opted for a different compensation model, distinct from the common practice of taking a percentage of auction proceeds. For the first two years of the project, every 10th TOWN token (ID #0, ID #10, ID #20, etc.) will be sent to the Deployer's Multisig, to be shared among its members. This will not affect the cadence of daily auctions.</p>

          <h3>The Contracts</h3>
          <p>The <a href={getContractUrl(TOWN_TOKEN_CONTRACT_ADDRESS)}>TownToken.sol</a>, and <a href={getContractUrl(EXODUS_DAO_CONTRACT_ADDRESS)}>ExodusDAO.sol</a> were created using the <a href="https://wizard.openzeppelin.com/">OpenZeppelin Wizard</a>, and the <a href={getContractUrl(AUCTION_HOUSE_CONTRACT_ADDRESS)}>AuctionHouse.sol</a> is a fork of <a href="https://nouns.wtf">NounsDAO</a>'s <a href="https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/NounsAuctionHouse.sol">NounsAuctionHouse</a>.<br />All the contracts are deployed on the Polygon network and verified on PolygonScan.
            <br />Everything, including this interface, is public and <a href="https://github.com/exodus-town">open source</a>.
            <br />There is <b className="warning"><IoMdWarning />NO AUDIT</b>.</p>

          <h3>The Disclaimer</h3>
          <p>Please note that none of the information provided here constitutes financial advice. Exercise your own judgment and consult professionals before making any investment decisions. Exodus Town is a product of what might be described as a self-hatred fueled, narcotics-induced coding extravaganza. To put it bluntly, this is a high-risk experiment in the Metaverse; it's uncharted waters with unpredictable tides. By interacting with Exodus Town through this interface, you implicitly agree to not expect any guaranteed outcome, benefit, or return on investment. You acknowledge that you're essentially venturing into a digital Wild West where anything can happen—and probably will. Proceed with caution, intrepid explorer.</p>          
        </div>
      </ Container>
    </div >
  </>
});
