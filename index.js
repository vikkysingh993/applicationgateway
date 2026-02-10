const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

/* ========== APIs ========== */
app.use(
  "/api/vaultapi",
  createProxyMiddleware({
    target: "https://vaultapi.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/vaultapi": ""
    }
  })
);

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

app.use(
  "/api/dexwallet",
  createProxyMiddleware({
    target: "https://dexwallet-8sd1.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/dexwallet": ""
    }
  })
);

app.use("/api/solanaapi", createProxyMiddleware({
  target: "https://api-notify.onrender.com",
  changeOrigin: true,
}));

app.use(
  "/api/vaultswap",
  createProxyMiddleware({
    target: "https://vaultswap.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/vaultswap": ""
    }
  })
);


app.use(
  "/api/wallethistory",
  createProxyMiddleware({
    target: "https://walletandcoinhistory.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/wallethistory": ""
    }
  })
);

/* ========== UI ========== */
app.use(
  "/admin",
  createProxyMiddleware({
    target: "https://vaultadmin-ep4d.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/admin": ""
    },
    onProxyReq(proxyReq, req) {
      // If user hits /admin or /admin/
      if (req.originalUrl === "/admin" || req.originalUrl === "/admin/") {
        proxyReq.path = "/";
      }
    }
  })
);

app.use("/", createProxyMiddleware({
  target: "https://vaultapp-74ys.onrender.com",
  changeOrigin: true,
}));

/* ========== SPA FALLBACK (VERY IMPORTANT) ========== */
/* This MUST be the LAST middleware */
app.use((req, res) => {
  // Any unknown route → load SPA
  res.redirect("/");
});

app.listen(process.env.PORT, () => {
  console.log("Gateway running");
});
