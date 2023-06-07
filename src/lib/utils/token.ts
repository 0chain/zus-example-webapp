export const tokenToZcn = (token: number = 0): number =>
  parseFloat((token / Math.pow(10, 10)).toString())