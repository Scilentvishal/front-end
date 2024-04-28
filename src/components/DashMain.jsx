'use client';
import { useEffect, useState } from 'react';
import StudentsData from './StudentsData';
import { getAllStudents } from '@/utils/auth';
import Link from 'next/link';
// import RideData from './rideData';
// import axios from 'axios';

const DashMain = () => {
  const [students, setstudents] = useState([])
  useEffect(() => {
    
    const students = async () => {
      const getstudents = await getAllStudents();
      console.log(getstudents)
      if (getstudents) {
       console.log(`getstudents: ${getstudents}`);
       setstudents(getstudents)
      }
    };
    students()
  }, []);

  return (
    <div className="w-full bg-white mx-auto p-4 rounded-md">
      <div className="w-full mx-auto overflow-x-hidden min-h-96">
       
          <StudentsData students={students} />
      <Link href="/AddStudent" className='py-3 px-5 mt-10 bg-green-600 text-white rounded-md'>Add Student</Link>
      </div>
    </div>
  );
};

export default DashMain;
