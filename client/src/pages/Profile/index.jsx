import { useUser } from "@/hooks/useUser";
import { useGetUserQuery } from "@/store/services/usersApi";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Profile = () => {
  const signedUser = useUser();
  const { data: user, isError, isLoading } = useGetUserQuery(signedUser?.token);

  return (
    isLoading ? (
      <div className="w-full flex items-center justify-center">
        <HashLoader size={70} color="#F8DB39" />
      </div>
    ) : (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        {isError && <p>Error occurred while fetching user data.</p>}
        {user && (
          <>
            <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
            <div className="space-y-6 mb-8">
              <InfoRow label="Name" value={user.name} />
              <InfoRow label="Surname" value={user.surname} />
              <InfoRow label="Username" value={user.username} />
              <InfoRow label="Email" value={user.email} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Completed Quizzes</h2>
              {user?.completedQuizzes?.length > 0 ? (
                <ul className="space-y-4">
                  {user?.completedQuizzes?.map((quiz, index) => (
                    <li key={index}>
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
      </div>)
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <p className="text-lg font-semibold">{label}:</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default Profile;
