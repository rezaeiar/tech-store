function usePercentage(price, percentage) {

    let costPercentage = price * (percentage / 100);
    return (price - costPercentage).toFixed(2) ;
}

export default usePercentage;