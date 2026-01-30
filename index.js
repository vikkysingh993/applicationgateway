const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const proxy = (target, prefix) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^${prefix}`]: "" },
    onError(err, req, res) {
      console.error(`Proxy error for ${prefix}:`, err.message);
      res.status(502).send("Bad Gateway");
    }
  });

/* ========== APIs ========== */
app.use("/api/vaultapi", proxy(process.env.VAULT_API, "/api/vaultapi"));
app.use("/api/bitcoinapi", proxy(process.env.BITCOIN_API, "/api/bitcoinapi"));
app.use("/api/cardanoapi", proxy(process.env.CARDANO_API, "/api/cardanoapi"));
app.use("/api/coinapi", proxy(process.env.COIN_API, "/api/coinapi"));
app.use("/api/dexwallet", proxy(process.env.DEXWALLET_API, "/api/dexwallet"));
app.use("/api/solanaapi", proxy(process.env.SOLANA_API, "/api/solanaapi"));
app.use("/api/vaultswap", proxy(process.env.SOLANA_API, "/api/vaultswap"));
app.use("/api/wallethistory", proxy(process.env.SOLANA_API, "/api/wallethistory"));

/* ========== UI ========== */
app.use("/admin", proxy(process.env.UI_ADMIN, "/admin"));
app.use("/", proxy(process.env.UI_MAIN, "/"));

app.get("/health", (_, res) => res.send("OK"));

app.listen(process.env.PORT, () => {
  console.log("Gateway running");
});

