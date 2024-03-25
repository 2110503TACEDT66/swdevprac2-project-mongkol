export default async function getDentists() {
  
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch('http://localhost:5000/api/dentists');
    if (!response.ok) {
      throw new Error('Failed to fetch Hospitals');
    } 
    return await response.json();
}