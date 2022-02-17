module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.userName === "maple" && req.body.pwd === "123456") {
      return res.status(200).json({
        user: {
          token: "123456",
        },
      });
    } else {
      return res.status(400).json({ message: "error" });
    }
  }
};
