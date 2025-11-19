import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ToolCase,
} from "lucide-react";

export const statusPhysicalcopy = (status: string) => {
  switch (status) {
    case "available":
      return {
        text: "Sẵn sàng",
        color: "green",
        icon: <CheckCircle size={16} />,
      };
    case "borrowed":
      return {
        text: "Đang mượn",
        color: "orange",
        icon: <Clock size={16} />,
      };
    case "reserved":
      return {
        text: "Đã đặt trước",
        color: "blue",
        icon: <AlertCircle size={16} />,
      };
    case "lost":
      return {
        text: "Mất",
        color: "red",
        icon: <XCircle size={16} />,
      };
    case "maintenance":
      return {
        text: "Bảo trì",
        color: "orange",
        icon: <ToolCase size={16} />,
      };
    default:
      return {
        text: "Chưa có thông tin",
        color: "gray",
        icon: <AlertCircle size={16} />,
      };
  }
};
