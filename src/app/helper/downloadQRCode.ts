import generateQRCode from "./qrcodegenrating";

export const downloadQRCodeWithText = async (
  shortCode: string,
  labelText: string,
  logoUrl?: string,
  footerText: string = "Scan to view our menu"
) => {
  const qrDataURL = await generateQRCode(shortCode);
  if (!qrDataURL) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const canvasWidth = 300;
  const canvasHeight = logoUrl ? 500 : 430;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  if (!ctx) return;

  //Background style
  ctx.fillStyle = "#deb887";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  let yOffset = 20;

  const drawLabelText = () => {
    ctx.fillStyle = "#1a202c";
    ctx.font = "bold 20px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labelText, canvasWidth / 2, yOffset + 20);
    yOffset += 30;
  };

  const drawQRCode = (qrImg: HTMLImageElement) => {
    ctx.drawImage(qrImg, 0, yOffset, 300, 300);
    yOffset += 310;

    // Footer text
    ctx.fillStyle = "#1a202c";
    ctx.font = "20px semibold 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(footerText, canvasWidth / 2, yOffset + 20);

    // Trigger download
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
  };

  const qrImg = new Image();
  qrImg.onload = () => {
    drawLabelText();
    drawQRCode(qrImg);
  };

  if (logoUrl) {
    const logoImg = new Image();
    logoImg.onload = () => {
      const logoSize = 60;
      ctx.drawImage(logoImg, (canvasWidth - logoSize) / 2, yOffset, logoSize, logoSize);
      yOffset += logoSize + 10;
      qrImg.src = qrDataURL;
    };
    logoImg.src = logoUrl;
  } else {
    qrImg.src = qrDataURL;
  }
};
