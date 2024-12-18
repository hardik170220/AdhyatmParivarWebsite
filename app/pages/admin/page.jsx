"use client"
import React, { useState } from 'react';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  // Department form state
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  
  // Services form state
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  // Login handler
  const handleLogin = () => {
    if (password === 'admin@1234') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Department form submission handler
  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    alert(`Department Added:\nName: ${departmentName}\nDescription: ${departmentDescription}`);
    
    // Reset form
    setDepartmentName('');
    setDepartmentDescription('');
  };

  // Services form submission handler
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    alert(`Service Added:\nName: ${serviceName}\nDescription: ${serviceDescription}`);
    
    // Reset form
    setServiceName('');
    setServiceDescription('');
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center font-Alkatra items-center min-h-screen w-full bg-gray-100">
        <div className="w-96 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <div className="mb-4">
            <label 
              htmlFor="password" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input 
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder:text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4" role="alert">
              <span className="block text-sm sm:inline">Incorrect password. Please try again.</span>
            </div>
          )}
          <div className="flex items-center justify-center">
            <button 
              onClick={handleLogin}
              className="bg-gray-800 w-full hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="p-6 bg-gray-100 font-Alkatra w-full min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
      
      <div className="w-full">
        <div className="flex mb-4">
          <button 
            className="w-1/2 py-2 bg-blue-500 text-white font-bold"
            onClick={() => {
              const departmentsTab = document.getElementById('departments');
              const servicesTab = document.getElementById('services');
              departmentsTab.classList.remove('hidden');
              servicesTab.classList.add('hidden');
            }}
          >
            Add Department
          </button>
          <button 
            className="w-1/2 py-2 bg-green-500 text-white font-bold"
            onClick={() => {
              const departmentsTab = document.getElementById('departments');
              const servicesTab = document.getElementById('services');
              servicesTab.classList.remove('hidden');
              departmentsTab.classList.add('hidden');
            }}
          >
            Add Services
          </button>
        </div>
        
        <div id="departments" className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Add New Department</h2>
          <form onSubmit={handleDepartmentSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="departmentID" 
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Department ID
              </label>
              <input 
                id="departmentID"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label 
                htmlFor="departmentName" 
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Department Name
              </label>
              <input 
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label 
                htmlFor="departmentDescription" 
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Department Description
              </label>
              <input 
                id="departmentDescription"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Department
            </button>
          </form>
        </div>
        
        <div id="services" className="bg-white shadow-md rounded-lg p-6 hidden">
          <h2 className="text-xl font-bold mb-4">Add New Service</h2>
          <form onSubmit={handleServiceSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="serviceName" 
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Service Name
              </label>
              <input 
                id="serviceName"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label 
                htmlFor="serviceDescription" 
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Service Description
              </label>
              <input 
                id="serviceDescription"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button 
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;