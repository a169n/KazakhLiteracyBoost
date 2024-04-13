import { useUser } from "@/hooks/useUser";
import { useGetUserQuery } from "@/store/services/usersApi";
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const signedUser = useUser();
  const { data: user, isError, isLoading } = useGetUserQuery(signedUser?.token);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while fetching user data.</p>}
      {user && (
        <>
          <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
          <div className="flex flex-col mb-6">
            <div className="flex justify-between">
              <p className="text-lg font-semibold mb-1">Name:</p>
              <p className="text-gray-800">{user.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold mb-1">Surname:</p>
              <p className="text-gray-800">{user.surname}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold mb-1">Username:</p>
              <p className="text-gray-800">{user.username}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold mb-1">Email:</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Completed Quizzes</h2>
            {user?.completedQuizzes?.length > 0 ? (
              <ul>
                {user?.completedQuizzes?.map((quiz, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      to={`/quiz/${quiz?.quiz?._id}`}
                      className="text-blue-500 hover:underline hover:text-blue-600 transition duration-300">
                      {quiz?.quiz?.title}
                    </Link>{" "}
                    - Score: {quiz?.score}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No completed quizzes yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
