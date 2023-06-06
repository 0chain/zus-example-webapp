export const selectActiveWallet = state => {
  const { list = [], activeWalletId = '' } = state.wallet

  return list.find(wallet => wallet.id === activeWalletId) || {}
}
