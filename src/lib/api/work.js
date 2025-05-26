export const getWork = async () => {
  const response = await fetch("https://api.example.com/work");
  const data = await response.json();
  return data;
};
