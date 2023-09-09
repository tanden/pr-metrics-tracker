// 中央値を取得する
function median(leadTimes) {
    if (leadTimes.length === 0) { return 0; }
    leadTimes.sort((a, b) => a - b);
    const half = Math.floor(leadTimes.length / 2);

    if (leadTimes.length % 2) {
        return leadTimes[half];
    } else {
        return (leadTimes[half - 1] + leadTimes[half]) / 2;
    }
}
