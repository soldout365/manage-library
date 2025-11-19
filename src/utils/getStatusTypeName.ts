export const getStatusTypeName = (statusTypeName: string) => {
  switch (statusTypeName) {
    case "new":
      return { text: "Mới", color: "green" };
    case "good":
      return { text: "Tốt", color: "blue" };
    case "worn":
      return { text: "Cũ", color: "yellow" };
    case "damaged":
      return { text: "Hư hỏng", color: "red" };
    default:
      return { text: "Chưa có thông tin", color: "gray" };
  }
};
