import React from "react";
import PropTypes from "prop-types";

import "./Market.global.css";

export default class Marketplace extends React.Component {

  constructor(props) {
      super(props);
      this.state = {

      };
  }
  
  render() {
    
    return (
    <div  className="marketplace">        
        <div className="currentUserDropdown"></div>
        <div  className="marketImageBackground"></div>
        <div  className="market">Market</div>
        <div  className="home">Home</div>
        <div  className="apps">Apps</div>
        <div  className="staking">Staking</div>
        <div  className="guilds">Guilds</div>
        <div  className="advanced">Advanced</div>
        <div  className="stakingImageOuterLayer"></div>
        <div  className="advancedImageOuterLayer"></div>
        <div  className="advancedImageHorizontal"></div>
        <div  className="marketImageTop"></div>
        <div  className="marketImageLeft"></div>
        <div  className="marketImageCenter"></div>
        <div  className="marketImageBottom"></div>
        <div  className="stakingImageInnerLayer"></div>
        <div  className="accountName">elhfo.wam</div>
        <svg  preserveAspectRatio="none" viewBox="0 0 10 6" className="changeUserDropdown">
            <path d="M 4.231778144836426 0.921865701675415 C 4.63157320022583 0.44211146235466 5.368425369262695 0.4421114325523376 5.768220901489258 0.9218655824661255 L 8.633179664611816 4.35981559753418 C 9.175951957702637 5.011142730712891 8.712796211242676 6 7.864957809448242 6 L 2.135040998458862 6 C 1.287203550338745 6 0.8240476250648499 5.011142730712891 1.366819858551025 4.359816074371338 Z"  />
        </svg>
        <div  className="accountGroup">            
        <div className="waxLogoOuterLayer"></div>
        <div  className="waxPrimaryLogo"></div>
    </div>
        
    <div  className="appsGroup">            
        <svg  preserveAspectRatio="none" viewBox="-1.5 -1.5 12 12" className="appsImage">
            <path d="M 2 0 L 7 0 C 8.104569435119629 0 9 0.8954304456710815 9 2 L 9 7 C 9 8.104569435119629 8.104569435119629 9 7 9 L 2 9 C 0.8954304456710815 9 0 8.104569435119629 0 7 L 0 2 C 0 0.8954304456710815 0.8954304456710815 0 2 0 Z"  />
        </svg>
            <div  className="appsImageTopRight"></div>
            <div  className="appsImageBottomLeft"></div>
            <div  className="appsImageBottomRight"></div>
    </div>
        
    <div  className="homeGroup">            
        <svg  preserveAspectRatio="none" viewBox="-1.5 -1.5 12 9" className="homeImage">
            <path d="M 2 0 L 7 0 C 8.104569435119629 0 9 0.5969536304473877 9 1.333333373069763 L 9 4.666666507720947 C 9 5.403046607971191 8.104569435119629 6 7 6 L 2 6 C 0.8954304456710815 6 0 5.403046607971191 0 4.666666507720947 L 0 1.333333373069763 C 0 0.5969536304473877 0.8954304456710815 0 2 0 Z"  />
        </svg>
            <div  className="homeImageTopRight"></div>
            <div  className="homeImageBottomLeft"></div>
            <div  className="homeImageBottomRight"></div>
    </div>

    <div>
        <svg  preserveAspectRatio="none" viewBox="-0.75 -0.75 16.5 16.5" className="guildImage">
            <path d="M 7.5 0 C 11.64213562011719 0 15 3.357864379882812 15 7.5 C 15 11.64213562011719 11.64213562011719 15 7.5 15 C 3.357864379882812 15 0 11.64213562011719 0 7.5 C 0 3.357864379882812 3.357864379882812 0 7.5 0 Z"  />
        </svg>
        <svg  preserveAspectRatio="none" viewBox="0 0 5 5" className="guildImageTop">
            <path d="M 2.5 0 C 3.880712032318115 0 5 1.119288086891174 5 2.5 C 5 3.880712032318115 3.880712032318115 5 2.5 5 C 1.119288086891174 5 0 3.880712032318115 0 2.5 C 0 1.119288086891174 1.119288086891174 0 2.5 0 Z"  />
        </svg>
        <svg  preserveAspectRatio="none" viewBox="0 0 5 5" className="guildImageRight">
            <path d="M 2.5 0 C 3.880712032318115 0 5 1.119288086891174 5 2.5 C 5 3.880712032318115 3.880712032318115 5 2.5 5 C 1.119288086891174 5 0 3.880712032318115 0 2.5 C 0 1.119288086891174 1.119288086891174 0 2.5 0 Z"  />
        </svg>
        <svg  preserveAspectRatio="none" viewBox="0 0 5 5" className="guildImageBottomRight">
            <path d="M 2.5 0 C 3.880712032318115 0 5 1.119288086891174 5 2.5 C 5 3.880712032318115 3.880712032318115 5 2.5 5 C 1.119288086891174 5 0 3.880712032318115 0 2.5 C 0 1.119288086891174 1.119288086891174 0 2.5 0 Z"  />
        </svg>
        <svg  preserveAspectRatio="none" viewBox="0 0 5 5" className="guildImageBottomLeft">
            <path d="M 2.5 0 C 3.880712032318115 0 5 1.119288086891174 5 2.5 C 5 3.880712032318115 3.880712032318115 5 2.5 5 C 1.119288086891174 5 0 3.880712032318115 0 2.5 C 0 1.119288086891174 1.119288086891174 0 2.5 0 Z"  />
        </svg>
        <svg  preserveAspectRatio="none" viewBox="0 0 5 5" className="guildImageLeft">
            <path d="M 2.5 0 C 3.880712032318115 0 5 1.119288086891174 5 2.5 C 5 3.880712032318115 3.880712032318115 5 2.5 5 C 1.119288086891174 5 0 3.880712032318115 0 2.5 C 0 1.119288086891174 1.119288086891174 0 2.5 0 Z"  />
        </svg>
        <div  className="advancedImageVertical"></div>
        <div  className="searchBoxOutline"></div>
        <div  className="searchBoxImage"></div>
        <div  className="mostRecentBoxOutline"></div>

    <div  className="seachBoxGroup">            
        <div  className="searchBoxTop"></div>
        <div  className="searchBoxBottom"></div>
    </div>

    <div>
        <div  className="minAndMaxBox"></div>
        <div  className="waxCurrencyBox"></div>
        <div  className="gpkCollectionsImage"></div>
        <div  className="toppsCollectionsImage"></div>
        <div  className="tigerKingsCollectionsImage"></div>
        <div  className="usdCurrencyBox"></div>
        <div  className="minPrice">Min Price</div>
        <div  className="waxd6abf6f4">WAX</div>
        <div  className="currency">Currency</div>
        <div  className="gpk">GPK</div>
        <div  className="topps">Topps</div>
        <div  className="tigerKing">Tiger King</div>
        <div  className="collections">Collections</div>
        <div  className="priceFilter">Price Filter</div>
        <div  className="maxPrice">Max Price</div>
        <div  className="rectangle503"></div>
        <div  className="mostRecent">Most Recent</div>
        <svg  preserveAspectRatio="none" viewBox="0 0 10 6" className="mostRecentDropdown">
            <path d="M 4.231778144836426 0.921865701675415 C 4.63157320022583 0.44211146235466 5.368425369262695 0.4421114325523376 5.768220901489258 0.9218655824661255 L 8.633179664611816 4.35981559753418 C 9.175951957702637 5.011142730712891 8.712796211242676 6 7.864957809448242 6 L 2.135040998458862 6 C 1.287203550338745 6 0.8240476250648499 5.011142730712891 1.366819858551025 4.359816074371338 Z"  /></svg>
        <div  className="searchAssetsCollections">Search Assets & Collections</div>


        <div  className="assetAndCollectionsGroup">            
            <div  className="assAndCollectionsBoxLeftTopRow"></div>
            <div  className="assAndCollectionsBoxMidLeftTopRow"></div>
            <div  className="assAndCollectionsBoxMidRightTopRow"></div>
            <div  className="assAndCollectionsBoxRightTopRow"></div>
            <div className="theonlykarma06a55599">theonlykarma</div>
            <div  className="theonlykarma843bdd3c">theonlykarma</div>
            <div  className="theonlykarma196f5a55">theonlykarma </div>
            <div  className="theonlykarma1408369f">theonlykarma</div>
            <div  className="godzillRightTopRow">Godzilla</div>
            <div  className="astroDudeMidTopRow">Astro Dude</div>
            <div  className="piggyBankMidTopRow">Piggy Bank</div>
            <div  className="kingKeoLeftTopRow">King Keo</div>
            <div  className="dallas141Image"></div>
            <div  className="karmaCurrencyLeftTopRow">25,000 KARMA</div>
            <div  className="logoGroupLeftTopRow">                
            <div  className="logoOutlineLeftTopRow"></div>
            <div  className="logoGradient42c3069d"></div>
    </div>


    <div  className="piggyBankMidLeftTopRow">                
            <div  className="waxCurrnecyMidLeftTopRow">500 WAX</div>
            <div  className="waxLogoGroupMidLeftTopRow">                    
                <div  className="waxLogoOutlineMidLeftTopRow"></div>
                <div  className="waxPrimaryLogo1d3b7fa29"></div>
            </div>
    </div>
    <div  className="astroDudeMidRightTopRow">                
            <div  className="waxCurrencyMidRightTopRow">4,700 WAX</div>
            <div  className="waxLogoGroupMidRightTopRow">                    
                <div  className="waxLogoOutlineMidRightTopRow"></div>
                <div  className="waxPrimaryLogo1f6ab7b4a"></div>
            </div>
    </div>


    <div  className="godzillaTopRow">                
            <div  className="waxCurrencyTopRow">5000 WAX</div>
            <div  className="waxLogoGroupRightTopRow">                    
                <div  className="waxLogoOutlineRightTopRow"></div>
                <div  className="waxPrimaryLogo1d350aae6"></div>
            </div>
    </div>

            <div  className="piggyBankf5768d9a"></div>
            <div  className="astronaut5fb02e1a"></div>
            <div  className="godzilla8c995133"></div>
            <div  className="detailsBoxLeftTopRow"></div>
            <div  className="detailsBoxMidLeftTopRow"></div>
            <div  className="detailsBoxMidRightTopRow"></div>
            <div  className="detailsBoxRightTopRow"></div>
            <div  className="buyBoxLeftTopRow"></div>
            <div  className="buyBoxLeftMidTopRow"></div>
            <div  className="buyBoxRightMidTopRow"></div>
            <div  className="buyBoxRightTopRow"></div>
            <div  className="buyd978fd95">Buy</div>
            <div  className="buy018ff8eb">Buy</div>
            <div  className="buyf890f06a">Buy</div>
            <div  className="buy85ca4073">Buy</div>
            <div  className="details0b4489e9">Details</div>
            <div  className="detailsde3ebdb2">Details</div>
            <div  className="details3988eea3">Details</div>
            <div  className="detailsaf0b050f">Details</div>


    <div  className="midRowGroup">                
            <div  className="assAndCollectionsBoxLeftMidRow"></div>
            <div  className="assAndCollectionsBoxMidLeftMidRow"></div>
            <div  className="assAndCollectionsBoxMidRightMidRow"></div>
            <div  className="assAndCollectionsBoxRightMidRow"></div>
            <div  className="theonlykarma0c945f4c">theonlykarma</div>
            <div  className="theonlykarmad8623773">theonlykarma</div>
            <div  className="theonlykarma0aa08030">theonlykarma</div>
            <div  className="theonlykarmafda214a1">theonlykarma</div>
            <div  className="godzillRightMidRow">Godzilla</div>
            <div  className="astroDudeMidMidRow">Astro Dude</div>
            <div  className="piggyBankMidMidRow">Piggy Bank</div>
            <div  className="kingKeoLeftMidRow">King Keo</div>
            <div  className="dallas14152309f7f"></div>
            <div  className="karmaCurrencyLeftMidRow">25,000 KARMA</div>
            <div  className="logoGroupMidRow">                
            <div  className="logoOutlineMidRow"></div>
            <div  className="logoGradientdafedd01"></div>
    </div>
    
    <div className="piggyBankLeftMidRow">                    
            <div className="waxCurrnecyLeftMidRow">500 WAX</div>
            <div className="waxLogoGroupLeftMidRow">                        
            <div className="waxLogoOutlineLeftMidRow"></div>
            <div className="waxPrimaryLogo12311c13f"></div>
    </div>
    
   <div  className="astroDudeMidRightMidRow">                
            <div  className="waxCurrencyMidRightMidRow">4,700 WAX</div>
            <div  className="waxLogoGroupMidRightMidRow">                    
                <div  className="waxLogoOutlineMidRightMidRow"></div>
            <div className="waxPrimaryLogo138b77e3a"></div>
    </div>
    
    <div  className="godzillaMidRow">                
            <div  className="waxCurrencyRightMidRow">5000 WAX</div>
            <div  className="waxLogoGroupRightMidRow">                    
                <div  className="waxLogoOutlineRightMidRow"></div>
            <div className="waxPrimaryLogo190f87f62"></div>
    </div>

    
    <div  className="piggyBank6446c3f1"></div>
        <div  className="astronaut430b8aa5"></div>
        <div  className="godzilla30bc9ab2"></div>
        <div  className="detailsBoxLeftMidRow"></div>
        <div  className="detailsBoxMidLeftMidRow"></div>
        <div  className="detailsBoxMidRightMidRow"></div>
        <div  className="detailsBoxRightMidRow"></div>
        <div  className="buyBoxLeftMidRow"></div>
        <div  className="buyBoxLeftMidMidRow"></div>
        <div  className="buyBoxRightMidMidRow"></div>
        <div  className="buyBoxRightMidRow"></div>
        <div  className="buy43e5c6d8">Buy</div>
        <div  className="buyad58a953">Buy</div>
        <div  className="buy652dc7b3">Buy</div>
        <div  className="buy5a78af20">Buy</div>
        <div  className="detailsc8088909">Details</div>
        <div  className="detailsb8eb8109">Details</div>
        <div  className="details4bb07f6f">Details</div>
        <div  className="detailsb2d23e14">Details</div>
    </div>
    
    <div className="midRow2Group">                
    <div  className="assAndCollectionsBoxLeftMidRow2"></div>
        <div  className="assAndCollectionsBoxMidLeftMidRow2"></div>
        <div  className="assAndCollectionsBoxMidRightMidRow2"></div>
        <div  className="assAndCollectionsBoxRightMidRow2"></div>
        <div className="theonlykarmad69aa2cf">theonlykarma</div>
        <div className="theonlykarma41c63ff8">theonlykarma</div>
        <div className="theonlykarma1cd1856e">theonlykarma</div>
        <div className="theonlykarma70ec02fb">theonlykarma</div>
        <div  className="godzillRightMidRow2">Godzilla</div>
            <div  className="astroDudeMidMidRow2">Astro Dude</div>
            <div  className="piggyBankMidMidRow2">Piggy Bank</div>
            <div  className="kingKeoLeftMidRow">King Keo</div>
        <div className="dallas1413090169e"></div>
        <div  className="karmaCurrencyLeftMidRow2">25,000 KARMA</div>
            <div  className="logoGroupMidRow2">                
            <div  className="logoOutlineMidRow2"></div>
        <div className="logoGradient3adf50a1"></div>
    </div>
    <div className="piggyBankLeftMidRow2">                    
            <div className="waxCurrnecyLeftMidRow2">500 WAX</div>
            <div className="waxLogoGroupLeftMidRow2">                        
            <div className="waxLogoOutlineLeftMidRow2"></div>
            <div className="waxPrimaryLogo10e86f7992"></div>
    </div>
    <div  className="astroDudeMidRightMidRow2">                
            <div  className="waxCurrencyMidRightMidRow2">4,700 WAX</div>
            <div  className="waxLogoGroupMidRightMidRow2">                    
                <div  className="waxLogoOutlineMidRightMidRow2"></div>
            <div className="waxPrimaryLogo12909a9ba"></div>
    </div>
    <div  className="godzillaMidRow2">                
            <div  className="waxCurrencyRightMidRow2">5000 WAX</div>
            <div  className="waxLogoGroupRightMidRow2">                    
                <div  className="waxLogoOutlineRightMidRow2"></div>
            <div className="waxPrimaryLogo1d9322b5a"></div>
    </div>
    </div>
            <div className="piggyBankf22040c1"></div>
            <div className="astronaut7ff5ed4f"></div>
            <div className="godzillad404956b"></div>
            <div  className="detailsBoxLeftMidRow2"></div>
            <div  className="detailsBoxMidLeftMidRow2"></div>
            <div  className="detailsBoxMidRightMidRow2"></div>
            <div  className="detailsBoxRightMidRow2"></div>
            <div  className="buyBoxLeftMidRow2"></div>
            <div  className="buyBoxLeftMidMidRow2"></div>
            <div  className="buyBoxRightMidMidRow2"></div>
            <div  className="buyBoxRightMidRow2"></div>
            <div className="buybdf971cd">Buy</div>
            <div className="buyda1da78d">Buy</div>
            <div className="buy0969fcfd">Buy</div>
            <div className="buy1808a343">Buy</div>
            <div className="details466a2e62">Details</div>
            <div className="detailsd759487e">Details</div>
            <div className="details3d6f38f0">Details</div>
            <div className="detailse5206131">Details</div>
    </div>
            
            
        <div className="bottomRowGroup">               
        <div  className="assAndCollectionsBoxLeftBottomRow"></div>
        <div  className="assAndCollectionsBoxMidLeftBottomRow"></div>
        <div  className="assAndCollectionsBoxMidRightBottomRow"></div>
        <div  className="assAndCollectionsBoxRightBottomRow"></div>
            <div className="theonlykarma8964f21b">theonlykarma</div>
            <div className="theonlykarma2ca35b42">theonlykarma</div>
            <div className="theonlykarma6a258701">theonlykarma</div>
            <div className="theonlykarma">theonlykarma</div>
            <div  className="godzillRightBottomRow">Godzilla</div>
            <div  className="astroDudeMidBottomRow">Astro Dude</div>
            <div  className="piggyBankMidBottomRow">Piggy Bank</div>
            <div  className="kingKeoLeftBottomRow">King Keo</div>
            <div className="dallas141"></div>
            <div  className="karmaCurrencyLeftBottomRow">25,000 KARMA</div>
            <div  className="logoGroupBottomRow">                
            <div  className="logoOutlineBottomRow"></div>
            <div className="logoGradient"></div>
    </div>
    <div className="piggyBankLeftBottomRow">                    
            <div className="waxCurrnecyLeftbottomRow">500 WAX</div>
            <div className="waxLogoGroupLeftBottomRow">                        
            <div className="waxLogoOutlineLeftBottomRow"></div>
            <div className="waxPrimaryLogo1165f072b"></div>
    </div>
    <div  className="astroDudeMidRightBottomRow">                
            <div  className="waxCurrencyMidRightBottomRow">4,700 WAX</div>
            <div  className="waxLogoGroupMidRightBottomRow">                    
                <div  className="waxLogoOutlineMidRightBottomRow"></div>
            <div className="waxPrimaryLogo11718f770"></div>
    </div>
    </div>
    <div  className="godzillaBottomRow">                
            <div  className="waxCurrencyRightBottomRow">5000 WAX</div>
            <div  className="waxLogoGroupRightBottomRow">                    
                <div  className="waxLogoOutlineRightBottomRow"></div>
            <div className="waxPrimaryLogo1d9322b5a"></div>
    </div>
    </div>

            <div className="piggyBank"></div>
            <div className="astronaut"></div>
            <div className="godzilla"></div>
            <div  className="detailsBoxLeftBottomRow"></div>
            <div  className="detailsBoxMidLeftBottomRow"></div>
            <div  className="detailsBoxMidRightBottomRow"></div>
            <div  className="detailsBoxRightBottomRow"></div>
            <div  className="buyBoxLeftBottomRow"></div>
            <div  className="buyBoxLeftMidBottomRow"></div>
            <div  className="buyBoxRightMidBottomRow"></div>
            <div  className="buyBoxRightBottomRow"></div>
            <div className="buy61304eee">Buy</div>
            <div className="buy15b5ce9c">Buy</div>
            <div className="buy52c32023">Buy</div>
            <div className="buy">Buy</div>
            <div className="detailsdf3b12ec">Details</div>
            <div className="detailse6bcef8d">Details</div>
            <div className="detailsedaabad4">Details</div>
            <div className="details">Details</div>
    </div>
    </div>
    
    <div className="waxDesktopImageGroup">            
            <div className="wax">WAX</div>
            <div className="desktop">DESKTOP</div>
            <div className="waxdesktopImgRight"></div>
            <div className="waxDesktopImgLeft"></div>
    </div>
            <div className="rectangle2790"></div>
            <div className="usd">USD</div>
    </div>

    );
  }
}

Marketplace.propTypes = {

}

Marketplace.defaultProps = {

}



          