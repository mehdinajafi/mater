export default function kFormatter(num: number) {
  return num > 999
    ? ((Math.sign(num) * Number(Math.abs(num))) / 1000).toFixed(2) + "k"
    : Math.sign(num) * Math.abs(num);
}
