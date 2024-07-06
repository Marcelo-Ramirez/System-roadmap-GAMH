import React from 'react';

const tasks = [
    { title: "Propose 3 conference keynote ideas", status: "Waiting", priority: "Medium", dueDate: "Thursday" },
    { title: "Recruit three speakers for conference", status: "In Progress", priority: "High", dueDate: "Jul 16" },
    { title: "Finalize event name", status: "Waiting", priority: "High", dueDate: "Jul 16" },
    { title: "Finalize event budget", status: "On Hold", priority: "Medium", dueDate: "Jul 17" },
    // Add more tasks as needed
];

const TaskList = () => {
    return (
        <div className="p-4">
            <div className="bg-white rounded shadow">
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold">Areas</h3>
                </div>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className="flex justify-between items-center p-4 border-b border-gray-200">
                            <div>
                                <h4 className="font-semibold">{task.title}</h4>
                                <p className="text-sm text-gray-500">{task.dueDate}</p>
                            </div>
                            <div className="flex space-x-4">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                    task.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
                                    task.status === "Waiting" ? "bg-gray-100 text-gray-700" :
                                    task.status === "On Hold" ? "bg-red-100 text-red-700" :
                                    ""
                                }`}>{task.status}</span>
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                    task.priority === "High" ? "bg-red-100 text-red-700" :
                                    task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                    ""
                                }`}>{task.priority}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;
