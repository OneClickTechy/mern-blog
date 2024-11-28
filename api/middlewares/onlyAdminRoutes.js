const onlyAdminRoutes = async (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied" });
    }
};

export default onlyAdminRoutes;