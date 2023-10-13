const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    // L'utilisateur est connecté et a le rôle d'administrateur
    next();
  } else {
    req.session.error = "La page n'existe pas";
    res.redirect("/");
  }
};

const isLogin = (req, res, next) => {
  if (!req.session.user) {
    req.session.error = "Vous devez être connecté";
    res.redirect("/login");
    return;
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
