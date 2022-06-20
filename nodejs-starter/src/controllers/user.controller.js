const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const User = require("../models/user.model");
const bcryptThePassword = require("bcryptjs");
const {
  userService
} = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser({
    // _org: req.user._org,
    ...req.body
  });
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, {
    ...options,
    // populate: [{
    //   path: "_org",
    //   select: "_id name email"
    // }]
  });
  res.send(result);
});


const getUser = catchAsync(async (req, res) => {

  const user = await (await userService.getUserById(req.params.userId))
    .populate({ path: "bookmark.feedId", select: "_id caption photos" });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(req.user);
});


const changePassword = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const userDetails = await User.findOne({ _id });
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (newPassword === confirmPassword) {
    if (await bcryptThePassword.compare(oldPassword, userDetails.password)) {
      if (!newPassword.match(/\d/) || !newPassword.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
      try {
        const salt = await bcryptThePassword.genSalt(8);
        const passwordHashed = bcryptThePassword.hashSync(newPassword, salt);
        await User.findByIdAndUpdate(_id, {
          password: passwordHashed,
        });
        return res.status(200).json({
          message: "Successfully Updated",
        });
      } catch (e) {
        return res.status(500).json({
          error: {
            message: e.message,
          },
        });
      }
    }
    return res.status(400).json({
      message: "Password Doesn't Match with Old Password",
    });
  } else {
    return res.status(400).json({
      message: "newPassword and confirmPassword Doesn't Matched",
    });
  }
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body)
  res.send(user);
});

const updateOrg = catchAsync(async (req, res) => {
  const org = await userService.updateOrgById(req.params.orgId, req.body);
  res.send(org);
});

const updateProfilePicture = catchAsync(async (req, res) => {
  // console.log(req.file)
  const org = await userService.updateProfilePictueById(req.params.userId, { profilePicture: req.file.filename });
  res.send(org);
});


const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateProfilePicture,
  changePassword,
  deleteUser,
  updateOrg,
};
