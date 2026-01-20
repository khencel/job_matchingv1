import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck, FaSliders } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

export default function AdminUsers() {
  return (
    <>
        <div className="row standar-div">
            <div className="col">
                <h5><strong><BiArrowBack /> Users Listing</strong></h5>
            </div>
            <div className="col text-end">
                <span>November - December 2025 <FaCalendarCheck className="text-primary" /></span>
            </div>
        </div>

        <div className="row standar-div mt-2">
            <div className="col">
                <strong>Users List (2 total)</strong>
            </div>
            <div className="col-2 text-end">
                <FaSearch className="text-primary" /> Search Users
            </div>
            <div className="col-2 text-end">
                <FaSliders className="text-primary" /> Filter
            </div>
        </div>

        <div className="row standar-div">
                <div className="col">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="text-start p-2">Name</th>
                                <th className="text-start p-2">Email</th>
                                <th className="text-start p-2">Role</th>
                                <th className="text-start p-2">Status</th>
                                <th className="text-start p-2">Joined</th>
                                <th className="text-start p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-start p-2">John Doe</td>
                                <td className="text-start p-2">john.doe@example.com</td>
                                <td className="text-start p-2">Job Seeker</td>
                                <td className="text-start p-2">Active</td>
                                <td className="text-start p-2">2024-01-15</td>
                                <td className="text-start p-2"><HiDotsHorizontal /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    </>
  );
}