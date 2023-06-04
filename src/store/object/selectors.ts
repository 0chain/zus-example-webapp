export const selectFiles = (state, walletId?, allocationId?) => {
  const { wallets } = state.object
  const { activeAllocationId } = state.allocation
  const { activeWalletId } = state.wallet
  const wallet = wallets[walletId] || wallets[activeWalletId]
  const allocId = allocationId || activeAllocationId
  const files = (allocId && wallet && wallet[allocId]) || []

  return files
}
