class PortfolioHistory {

  constructor() {
      this.history = [];
  }

  sumAccumulativeAsset(){
    return this.history.reduce((acc, curr) => acc + curr.totalAssetValue(), 0);
  };

  sumCurrentAsset(){
    const finalPortfolio = this.history[this.history.length - 1];
    const totalAsset = finalPortfolio ? finalPortfolio.totalAssetValue() : 0;
      return totalAsset;
    
  };

  totalDollarGainOrLoss(){
  
    const finalPortfolioAsset = this.sumCurrentAsset()
    const startingPortfolioAsset = this.history[0]?.totalAssetValue() || 0;
    const difference = finalPortfolioAsset - startingPortfolioAsset;
    return parseFloat(difference.toFixed(2));
  
  };

  totalPercentChange(){
  
    const startingPortfolioAsset = this.history[0]?.totalAssetValue() || 0;
    const finalPortfolioAsset = this.sumCurrentAsset()
    const percentChange = (finalPortfolioAsset / startingPortfolioAsset);
    return parseFloat(percentChange.toFixed(2));
  
  };

  latestDailyPercentChange(cryptoName){
  
    const secondToLastPortfolioAsset = this.history[this.history.length - 2]?.assetsList.filter(item => item.name === cryptoName)[0]?.asset;
    
    const finalPortfolioAsset = this.history[this.history.length - 1]?.assetsList.filter(item => item.name === cryptoName)[0]?.asset

    if(secondToLastPortfolioAsset && finalPortfolioAsset){
      return (finalPortfolioAsset / secondToLastPortfolioAsset)
    }
  };

  addPortfolio(arr){
    this.history.push( Object.assign({}, addAssetsList(arr), addTotalAssetValue(arr), addTimestamp(arr)))

    function addAssetsList(arr){
      return {
        assetsList: arr
      }
    }

    function addTotalAssetValue(arr){
      return {
        totalAssetValue: () => arr.reduce((acc, curr) => acc + curr.asset, 0)
      }
    };

    function addTimestamp(arr){
      return {timestamp: () => arr[0].timestamp}
    };

    
  }
  
}

export default PortfolioHistory;

