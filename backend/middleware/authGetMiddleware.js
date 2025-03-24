import jwt from 'jsonwebtoken';

export default function (req, res, next) {

    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            req.isAuthorized = false;
            return next();
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (Date.now() >= decoded.exp * 1000) {
            req.isAuthorized = false;
            return next();
        }

        req.user = decoded;
        req.isAuthorized = true;
        next();

    } catch (error) {
        req.isAuthorized = false;
        next();
    }
}
