import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QrImage({
  value,
  size = 96,
  className = "",
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 0,
      color: { dark: "#0A0A0B", light: "#00000000" },
    }).then((url: string) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`animate-pulse rounded-md bg-cloud ${className}`}
      />
    );
  }

  return (
    <img
      src={dataUrl}
      alt="QR code"
      width={size}
      height={size}
      className={className}
    />
  );
}