export const generateRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F39C12", "#8E44AD", "#1ABC9C"]
  return colors[Math.floor(Math.random() * colors.length)]
}
