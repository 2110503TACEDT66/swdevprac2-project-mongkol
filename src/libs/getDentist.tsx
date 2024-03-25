export default async function getDentist(id:string) {
  
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${process.env.BACKEND_URL}/api/dentists/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Hospitals');
    } 
    return await response.json();
}