import { useEffect, useState } from "react";

type ToastMessageProps = {
  message: string;
  success: boolean;
};

export default function ToastMessage({ message, success }: ToastMessageProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!message) return;

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!message || !show) return null;

  return (
    <div
      className={`fixed right-5 top-5 z-[200] rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg ${
        success ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}
