import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-4">Admin Dashboard</h2>
          <ul className="space-y-2 p-4">
            <li>
              <Link
                to="user-details"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                User Details
              </Link>
            </li>
            <li>
              <Link
                to="train-details"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Active/Deactivate Trips
              </Link>
            </li>
            <li>
              <Link
                to="train-details"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Delete Scheduled Trip
              </Link>
            </li>
            <li>
              <Link
                to="train-details"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Delete Train
              </Link>
            </li>
            <li>
              <Link
                to="train-details"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Delete Route
              </Link>
            </li>
            <li>
              <Link
                to="train-details"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Delete Railway Station
              </Link>
            </li>
            <li>
              <Link
                to="train-details"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Delete Model
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <button className="bg-red-600 w-full p-2 rounded">Logout</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
