// api.js - API Client for Magazine and Member endpoints
import axios from 'axios';

// You might want to set a base URL in your actual implementation
const API = axios.create({
  baseURL: process.env.API_URL || 'https://api.adhyatmparivar.com/apmemberapi',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for authentication
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Magazine API endpoints
export const magazineAPI = {
  // Apply for magazine membership
  applyMembership: (membershipData) => {
    return API.post('/magazine/apply-magazine-membership', membershipData);
  },
  
  // Check magazine membership status
  checkMembership: () => {
    return API.get('/magazine/check-magazine-membership');
  },
  
  // Cancel magazine membership
  cancelMembership: (cancellationData) => {
    return API.post('/magazine/cancel-magazine-membership', cancellationData);
  }
};

// Member API endpoints
export const memberAPI = {
  // Get pending member list
  getPendingList: () => {
    return API.get('/member/pending-list');
  },
  
  // Approve a member
  approveMember: (memberId) => {
    return API.get(`/member/approve?memberId=${memberId}`);
  },
  
  // Get membership information
  getMembership: () => {
    return API.get('/member/membership');
  },
  
  // Get member details by mobile number
  getMemberDetail: (mobileNumber) => {
    return API.get(`/member/detail/${mobileNumber}`);
  },
  
  // Generate OTP for family member verification
  generateFamilyOTP: (familyData) => {
    return API.post('/member/generate-family-otp', familyData);
  },
  
  // Verify OTP for family member
  verifyFamilyOTP: (otp, mobileNumber) => {
    return API.get(`/member/verify-family-otp?otp=${otp}&mobileNumber=${mobileNumber}`);
  },
  
  // Get associated family members by mobile number
  getAssociatedFamily: (mobileNumber) => {
    return API.get(`/member/associated-family/${mobileNumber}`);
  },
  
  // Update member information
  updateMember: (memberData) => {
    return API.post('/member/update', memberData);
  },
  
  // Update member personal details
  updateMemberPersonalDetail: (personalData) => {
    return API.post('/member/update-member-personaldetail', personalData);
  },
  
  // Get member family details
  getMemberFamilyDetail: () => {
    return API.get('/member/get-member-familydetail');
  },
  
  // Update member family members
  updateMemberFamilyMembers: (familyData) => {
    return API.post('/member/update-member-familymembers', familyData);
  },
  
  // Get member family members
  getMemberFamilyMembers: () => {
    return API.get('/member/get-member-familymembers');
  },
  
  // Update member saint members
  updateMemberSaintMembers: (saintData) => {
    return API.post('/member/update-member-saintmembers', saintData);
  },
  
  // Get member saint members
  getMemberSaintMembers: () => {
    return API.get('/member/get-member-saintmembers');
  },
  
  // Update member registration
  updateMemberRegistration: (registrationData) => {
    return API.post('/member/update-member-registration', registrationData);
  },
  
  // Get member registration
  getMemberRegistration: () => {
    return API.get('/member/get-member-registration');
  },
  
  // Get member status
  getMemberStatus: () => {
    return API.get('/member/get-member-status');
  },
  
  // Send OTP
  sendOTP: (otpData) => {
    return API.post('/member/send-otp', otpData);
  },
  
  // Verify OTP
  verifyOTP: (verifyData) => {
    return API.post('/member/verify-otp', verifyData);
  }
};

// Example of handling errors globally
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with an error status
    console.error('API Error Response:', error.response.data);
    console.error('Status:', error.response.status);
    return {
      error: true,
      message: error.response.data.message || 'An error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error Request:', error.request);
    return {
      error: true,
      message: 'No response from server',
      status: 503
    };
  } else {
    // Something happened in setting up the request
    console.error('API Error Setup:', error.message);
    return {
      error: true,
      message: 'Error setting up request',
      status: 500
    };
  }
};

// Export the error handler and API instance for custom usage
export { handleApiError, API };

// ShrmanUpasana API endpoints
export const shramanUpasanaAPI = {
  // Add a member to Shraman Upasana
  addMember: (memberData) => {
    return API.post('/shraman-upasana/add-member', memberData);
  },
  
  // Remove a member from Shraman Upasana
  removeMember: (memberData) => {
    return API.post('/shraman-upasana/remove-member', memberData);
  },
  
  // Get Shraman Upasana members
  getMembers: () => {
    return API.get('/shraman-upasana/members');
  }
};

// Default export for convenience
export default {
  magazine: magazineAPI,
  member: memberAPI,
  shramanUpasana: shramanUpasanaAPI
};