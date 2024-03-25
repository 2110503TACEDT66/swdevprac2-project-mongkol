export default async function getDentists() {
  
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch(`${process.env.BACKEND_URL}/api/dentists` , {next: {tags: ['Dentist']}});
    if (!response.ok) {
      throw new Error('Failed to fetch Hospitals');
    } 
    return await response.json();
}