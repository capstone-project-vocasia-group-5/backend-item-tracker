const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user.id,
    role: user.role,
    email: user.email,
  };
};

module.exports = { createTokenUser };
