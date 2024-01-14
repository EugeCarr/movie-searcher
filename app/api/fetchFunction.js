export const basicFetch = async (endpoint, method) => {
    const response = await fetch(
        endpoint,
        {
            method: method? method : "GET"
        }
    );
    
    if(!response.ok) throw new Error ('Error');

    const data = await response.json();
    return data;
}