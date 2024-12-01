const onlyAdminRoutes = async (req, res, next) => {
    if (req?.user?.isAdmin) {
        return next();
    } else {
        return res.status(403).json({  message: "Forbidden, admin access only" });
    }
};

export default onlyAdminRoutes;