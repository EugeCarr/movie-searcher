export const basicFetch = async (endpoint, method) => {
    try {
        const response = await fetch(
            endpoint,
            {
                method: method? method : "GET"
            }
        );
        const body = await response.json();
        return body;
    }catch (error) {
        console.log(error);
        return {}
    } 
}