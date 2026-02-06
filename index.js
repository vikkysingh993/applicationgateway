const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

/* ========== APIs ========== */
app.use("/api/vaultapi", createProxyMiddleware({
  target: "https://api-auth.onrender.com",
  changeOrigin: true,
}));

app.use("/api/bitcoinapi", createProxyMiddleware({
  target: "https://api-user.onrender.com",
  changeOrigin: true,
}));

app.use("/api/cardanoapi", createProxyMiddleware({
  target: "https://api-order.onrender.com",
  changeOrigin: true,
}));

app.use("/api/coinapi", createProxyMiddleware({
  target: "https://api-report.onrender.com",
  changeOrigin: true,
}));

app.use("/api/dexwallet", createProxyMiddleware({
  target: "https://dexwallet-8sd1.onrender.com",
  changeOrigin: true,
}));

app.use("/api/solanaapi", createProxyMiddleware({
  target: "https://api-notify.onrender.com",
  changeOrigin: true,
}));

app.use("/api/vaultswap", createProxyMiddleware({
  target: "https://api-notify.onrender.com",
  changeOrigin: true,
}));

app.use("/api/wallethistory", createProxyMiddleware({
  target: "https://api-notify.onrender.com",
  changeOrigin: true,
}));

/* ========== UI ========== */
app.use("/admin", createProxyMiddleware({
  target: "https://ui-admin.onrender.com",
  changeOrigin: true,
}));

app.use("/", createProxyMiddleware({
  target: "https://ui-main.onrender.com",
  changeOrigin: true,
}));

app.listen(process.env.PORT, () => {
  console.log("Gateway running");
});
