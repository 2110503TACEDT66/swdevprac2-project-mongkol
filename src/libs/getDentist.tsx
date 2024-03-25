export default async function getDentist(id:string) {
  
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`http://localhost:5000/api/dentists/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Hospitals');
    } 
    return await response.json();
}