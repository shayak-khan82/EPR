// export default function Footer() {
//   return (
//     <footer className="bg-blue-900 text-white mt-20 pt-14 relative">

//       {/* Curved Wave */}
//       <div className="absolute -top-8 left-0 right-0">
//         <svg viewBox="0 0 1440 320" className="w-full h-16">
//           <path
//             fill="#1e3a8a"
//             fillOpacity="1"
//             d="M0,128L80,112C160,96,320,64,480,80C640,96,800,160,960,170.7C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
//           ></path>
//         </svg>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
//         {/* College Info */}
//         <div>
//           <h3 className="text-2xl font-bold mb-3">College ERP System</h3>
//           <p className="text-gray-300 leading-relaxed">
//             A modern academic management solution designed for colleges to 
//             streamline attendance, academics, faculty, and administration tasks.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
//           <ul className="space-y-2 text-gray-200">
//             <li className="hover:text-white cursor-pointer">Students</li>
//             <li className="hover:text-white cursor-pointer">Faculty</li>
//             <li className="hover:text-white cursor-pointer">Departments</li>
//             <li className="hover:text-white cursor-pointer">Courses</li>
//             <li className="hover:text-white cursor-pointer">Subjects</li>
//           </ul>
//         </div>

//         {/* Features */}
//         <div>
//           <h4 className="text-xl font-semibold mb-3">Features</h4>
//           <ul className="space-y-2 text-gray-200">
//             <li className="hover:text-white cursor-pointer">Face Recognition Attendance</li>
//             <li className="hover:text-white cursor-pointer">Lecture Scheduling</li>
//             <li className="hover:text-white cursor-pointer">Exam Management</li>
//             <li className="hover:text-white cursor-pointer">Performance Analytics</li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h4 className="text-xl font-semibold mb-3">Contact Us</h4>
//           <ul className="space-y-2 text-gray-200">
//             <li>Email: admin@collegeerp.com</li>
//             <li>Phone: +91 98765 12345</li>
//             <li>Address: Campus Road, India</li>
//           </ul>
//         </div>

//       </div>

//       {/* Bottom Strip */}
//       <div className="mt-10 py-4 bg-blue-950 text-center text-gray-300 text-sm">
//         © {new Date().getFullYear()} College ERP System — All Rights Reserved
//       </div>
//     </footer>
//   );
// }
export default function Footer() {
  return (
    <footer className="bg-[#0d1b3d] text-white pt-16 pb-8">

      {/* Main Footer Container - Smaller Width */}
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* College Info */}
        <div>
          <h3 className="text-2xl font-bold mb-3">College ERP</h3>
          <p className="text-gray-300 text-sm">
            A streamlined college management system with AI-powered attendance 
            and easy academic administration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Students</li>
            <li className="hover:text-white cursor-pointer">Faculty</li>
            <li className="hover:text-white cursor-pointer">Departments</li>
            <li className="hover:text-white cursor-pointer">Courses</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Features</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Face Recognition</li>
            <li className="hover:text-white cursor-pointer">Exam Management</li>
            <li className="hover:text-white cursor-pointer">Lectures</li>
            <li className="hover:text-white cursor-pointer">Analytics</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: support@collegeerp.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Campus Road, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom text */}
      <div className="mt-10 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} College ERP — All Rights Reserved
      </div>
    </footer>
  );
}
