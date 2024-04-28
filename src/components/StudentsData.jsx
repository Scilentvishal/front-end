import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const StudentsData = ({ students }) => {

  const handleDelete = async (id) => {
    console.log(`id: ${id}`);
    try {
      await axios.post(`http://localhost:5000/api/studentsDelete`, { id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="relative overflow-x-auto h-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-5">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                hobbies
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                mobile
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Delete
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr className="bg-white border-b" key={i}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap "
                >
                <img src={student.profileImage && student.profileImage} width={70} height={70} alt={student.name} className='h-14 w-14 object-cover rounded-full' />
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap "
                >
                  {student.name}
                </th>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">
                  {student.hobbies.map((hobby, i) => (
                    <p key={i}>{hobby}</p>
                  ))}
                </td>
                <td className="px-6 py-4">{student.gender}</td>
                <td className="px-6 py-4">{student.mobile}</td>
                <td className="px-6 py-4 text-red-500">
                  <button onClick={() => handleDelete(student._id)}>
                    Delete
                  </button>
                </td>
                <td className="px-6 py-4 text-black">
                  <Link href={`/AddStudent/${student._id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      
      </div>
      );
};

export default StudentsData;
