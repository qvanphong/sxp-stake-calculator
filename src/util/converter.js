const ATOMIC = 100000000;

export const arktoshiToArk = (arktoshi) => {
	return Number.parseFloat(arktoshi / ATOMIC).toFixed(2)
}

export const toVoteWeight = (total, amount) => {
	return Number.parseFloat((amount * 100) / total).toFixed(2)
}