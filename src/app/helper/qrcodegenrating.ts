import QRCode from "qrcode";

const generateQRCode = async (shortCode: string) => {
  const shortLink = `http://localhost:3000/m/${shortCode}`;

  try {
    const qrDataURL = await QRCode.toDataURL(shortLink, {
      errorCorrectionLevel: "H",
      margin: 2,
      scale: 8,
      color: {
        dark: "#1a1a1a",
      },
    });
    return qrDataURL;
  } catch (err) {
    console.error(err);
  }
};

export default generateQRCode;
