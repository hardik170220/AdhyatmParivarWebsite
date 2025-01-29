import axios from "axios"

export const fetchDept = async() =>{
    const url = `${process.env.DEPT_URL}`
    try {
     const response = await axios.get(url);
     console.log(response,"rep")
     return response.data
   } catch (error) {
     console.log(error);
     throw new Error('could not fetch data from url');
   }
 }

export const fetchServices = async() =>{
    const url = `${process.env.SERVICE_URL}`
    try {
     const response = await axios.get(url);
     return response.data
   } catch (error) {
     console.log(error);
     throw new Error('could not fetch data from url');
   }
 }