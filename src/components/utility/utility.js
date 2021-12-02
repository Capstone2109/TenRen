const history = [];

const transactions = (state) => ({
  transactions: () => state,
});

const asset = (state) => ({
  asset: () => state.reduce((acc, curr) => acc + curr.asset, 0),
});

const timestamp = (state) => ({
  timestamp: () => state[0].timestamp,
});

const portfolio = (state) => {
  return Object.assign({}, transactions(state), asset(state), timestamp(state));
};

const sumAsset = (history) => {
 return history.reduce((acc, curr) => acc + curr.asset, 0);
}


const totalAsset = (history) => ({
	totalAsset: () => {
		const finalPortfolio = history[history.length - 1].transactions();
		const totalAsset = finalPortfolio ? sumAsset(finalPortfolio) : 0;
		return totalAsset;
	}
});

const totalDollarGainOrLoss = (history) => ({
	totalDollarGainOrLoss: () => {
		const finalPortfolioAsset = sumAsset(history[history.length - 1].transactions());
		const startingPortfolioAsset = sumAsset(history[0].transactions());
		const difference = finalPortfolioAsset - startingPortfolioAsset;
		return parseFloat(difference.toFixed(2));
	}
});

const totalPercentChange = (history) => ({
	totalPercentChange: () => {
  const startingPortfolioAsset = sumAsset(history[0].transactions());
		const finalPortfolioAsset = sumAsset(history[history.length - 1].transactions());
		const difference = finalPortfolioAsset - startingPortfolioAsset;
  const percentChange =
    (difference / startingPortfolioAsset) * 100;
	return parseFloat(percentChange.toFixed(2));
	}
});

const getHistory = (history) => ({
	history: () => {
		return history;
	}
})

const portfolio1 = [
  {
    name: "Cash",
    asset: 200,
    percentChange: 1,
    timestamp: 1637190000000,
  },
  {
    name: "Bitcoin",
    asset: 300,
    percentChange: 1.0235, // 300 * 1.0235 = 307.235
    timestamp: 1637190000000,
  },
];

const portfolio2 = [
  {
    name: "Cash",
    asset: 300, // 200 + 100
    percentChange: 1,
    timestamp: 1637258400000,
  },
  {
    name: "Bitcoin",
    asset: 207.05, // 300 * 1.0235 = 307.05 - 100 because user sold $100 worth of btc today
    percentChange: 0.9765,
    timestamp: 1637258400000,
  },
];

const portfolioOne = portfolio(portfolio1);
const portfolioTwo = portfolio(portfolio2);

history.push(portfolioOne, portfolioTwo);


const obj = Object.assign({}, getHistory(history), totalAsset(history), totalDollarGainOrLoss(history), totalPercentChange(history));

console.log(obj.history());
console.log(obj.totalAsset(history))
console.log(obj.totalDollarGainOrLoss(history));
console.log(obj.totalPercentChange(history));