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

const setErrorLocals = (req, res, next) => {
  if (req.session.error) {
    res.locals.error = req.session.error;
    req.session.error = null;
  }
  next();
};

const setSuccessLocals = (req, res, next) => {
  if (req.session.success) {
    res.locals.success = req.session.success;
    req.session.success = null;
  }
  next();
};

module.exports = { isAdmin, isLogin, setErrorLocals, setSuccessLocals };
