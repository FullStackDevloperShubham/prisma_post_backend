// prisma and cookie
const prisma = require('../prisma/index')
const cookieToken = require('../utils/cookieToken')
// user sign up 
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    // check
    if (!name || !email || !password) {
      throw new Error('Plese provide all fields')
    }

    // create user using prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    // send user token 
    cookieToken(user, res)

  } catch (error) {
    throw new Error(error)
  }
}


// user login
exports.login = async (req, res, next) => {
  try {
    // taking info from user
    const { email, password } = req.body

    if (!email || !password) {
      throw new Error("Plese provide email and password")
    }

    // find user based on email
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    // no user
    if (!user) {
      throw new Error("user not found")
    }

    // password mismatch
    if (user.password !== password) {
      throw new Error("password mismatch")
    }

    // user is there and validate
    cookieToken(user, res)


  } catch (error) {
    throw new Error(error)
  }
}

// log out
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token')
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    throw new Error(error)
  }
}