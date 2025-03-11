import jwt from "jsonwebtoken"

const checkAuth = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId // Attach userId to request
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export default checkAuth
