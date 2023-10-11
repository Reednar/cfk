const isAdmin = (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({ error: "You are not authorized" });
  }
  next();
};

const isLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  }
  next();
};

module.exports = { isAdmin, isLogin };
