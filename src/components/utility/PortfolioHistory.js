class PortfolioHistory {

  constructor(arr=[]) {
      this.history = arr;
  }

  setHistory(arr) {
    this.history = arr
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
    //const difference = finalPortfolioAsset - startingPortfolioAsset;
    const percentChange = (finalPortfolioAsset / startingPortfolioAsset);
    return parseFloat(percentChange.toFixed(2));
  
  };

  latestDailyPercentChange(cryptoName){
  
    const secondToLastPortfolioAsset = this.history[this.history.length - 2]?.assetsList.filter(item => item.name === cryptoName)[0]?.asset || 0;
    
    const finalPortfolioAsset = this.history[this.history.length - 1]?.assetsList.filter(item => item.name === cryptoName)[0]?.asset || 0;

    const percentChange = (finalPortfolioAsset / secondToLastPortfolioAsset);
    return parseFloat(percentChange.toFixed(2));
  
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

// const portfolio1 = [
//   {
//     name: "Cash",
//     asset: 200,
//     percentChange: 1,
//     timestamp: 1637190000000,
//   },
//   {
//     name: "Bitcoin",
//     asset: 300,
//     percentChange: 1.0235, // 300 * 1.0235 = 307.235
//     timestamp: 1637190000000,
//   },
// ];

// const portfolio2 = [
//   {
//     name: "Cash",
//     asset: 300, // 200 + 100
//     percentChange: 1,
//     timestamp: 1637258400000,
//   },
//   {
//     name: "Bitcoin",
//     asset: 207.05, // 300 * 1.0235 = 307.05 - 100 because user sold $100 worth of btc today
//     percentChange: 0.9765,
//     timestamp: 1637258400000,
//   },
// ];


export default PortfolioHistory;

