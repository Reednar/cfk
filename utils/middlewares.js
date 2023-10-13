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

const isConnect = (req, res, next) => {
  // si l'utilisateur est connecté on return true
  if (req.session.user) {
    return true;
  }
  // sinon on return false
  return false;
};

module.exports = { isAdmin, isLogin, isConnect };
