const arktoshiAtomic = 100000000
const minDelegateReward = 6.75
const maxDelegateReward = 13.25

const calculateDailyIncome = (rank) => {
  let secondPerRound = 424
  let secondInDay = 86400
  let rankReward = minDelegateReward + (rank - 1) * 0.125

  return (secondInDay / secondPerRound) * rankReward
}

const getRankDiff = (delegates, delegateName, votes) => {
  if (delegates.length === 0) return 0;
  return delegates.filter((delegate) => delegate.votes < votes).length;
}

const calculateStake = (delegates, balance, isVoted) => {
	const result = delegates;

	if (!isVoted) {
		result.map((delegate, index) => {
			const votesAfterVoting = delegate.votes + balance;
			const rankDiff = getRankDiff(result.slice(0, index), delegate.username, votesAfterVoting)

			delegate.rankDiff = rankDiff
			return delegate;
		})
	}

  return result.map((delegate) => calculateIncome(delegate, balance, isVoted))
}


const calculateIncome = (delegate, balance, isVoted) => {
  if (balance == 0 || balance == '0' || balance == '') {
    delegate.daily = 0
    delegate.weekly = 0
	delegate.userVoteWeight = 0
	delegate.votedTotalVotes = delegate.votes
  } else {
	const rank = delegate.rank - (!isVoted && delegate.rankDiff ? delegate.rankDiff : 0)
    const dailyIncomeOfDelegate = calculateDailyIncome(rank)
    const shares = (dailyIncomeOfDelegate * delegate.payout) / 100
    const votingRate = delegate.votes
	const votesAfterVoting = (votingRate + (isVoted ? 0 : balance))

    delegate.daily = Number.parseFloat(shares / (votesAfterVoting / balance)).toFixed(2)
    delegate.weekly = Number.parseFloat(delegate.daily * 7).toFixed(2)
	delegate.votedTotalVotes = votesAfterVoting
	delegate.userVoteWeight =  Number.parseFloat(balance * 100 / votesAfterVoting).toFixed(2)
  }

  return delegate
}


export { calculateStake }
