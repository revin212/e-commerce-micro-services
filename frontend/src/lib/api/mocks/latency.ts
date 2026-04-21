export const waitMockLatency = async () => {
  const delay = 150 + Math.floor(Math.random() * 300);
  await new Promise((resolve) => setTimeout(resolve, delay));
};
