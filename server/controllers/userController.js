const User = require("../models/userSchema");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const reqUser = req.user;

  try {
    const user = await User.findById(reqUser._id).populate({
      path: "completedQuizzes",
      populate: { path: "quiz" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addPointsToUser = async (req, res) => {
  const reqUser = req.user;
  const { pointsToAdd } = req.body;

  if (isNaN(pointsToAdd)) {
    return res.status(400).json({ message: "Invalid pointsToAdd value" });
  }

  try {
    const user = await User.findById(reqUser._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pointsToAddNum = parseInt(pointsToAdd);

    user.points += pointsToAddNum;
    await user.save();

    res.status(200).json({ message: "Points added to user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add points to user" });
  }
};

const saveCompletedQuiz = async (req, res) => {
  const user = req.user;
  const { quizId, score } = req.body;

  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.completedQuizzes.push({ quiz: quizId, score });
    user.points += score * 10;
    await user.save();

    res
      .status(200)
      .json({ message: "Quiz completed and score saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save quiz and score" });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCompletedTestsForWeek = async (req, res) => {
  const user = req.user;
  console.log(user);
  try {
    const completedTests = user.completedTests;
    console.log(completedTests);
    const weeklyData = {};

    completedTests.forEach((completedQuiz) => {
      const completionDate = new Date(completedQuiz.createdAt);

      const isoWeekDate = getISOWeekDate(completionDate);

      if (!weeklyData[isoWeekDate]) {
        weeklyData[isoWeekDate] = 0;
      }

      weeklyData[isoWeekDate]++;
    });

    const formattedWeeklyData = Object.keys(weeklyData).map((date) => ({
      date,
      completed: weeklyData[date],
    }));

    res.status(200).json(formattedWeeklyData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getISOWeekDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const isoWeekDate = `${year}-W${String(Math.floor((day + 6) / 7)).padStart(
    2,
    "0"
  )}`;
  return isoWeekDate;
};

module.exports = {
  getAllUsers,
  getUser,
  addPointsToUser,
  saveCompletedQuiz,
  deleteUserById,
  getCompletedTestsForWeek,
};
