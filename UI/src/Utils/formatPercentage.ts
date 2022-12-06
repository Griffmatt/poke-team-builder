export const formatPercentage = (amount: number, total: number) => {
    const percentage = (amount/total)*100
    return percentage.toFixed(2)
  }