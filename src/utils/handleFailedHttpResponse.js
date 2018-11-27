// When a response returns a failed HTTP status code
// Fetch API doesn't throw an error, so this function 
// is created to combat just that by throwing an error if Http status code is not "ok"
// Read more on this issue here: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/

export default function handleFailedHttpResponse(response) {
    if(!response.ok) {
        throw Error(response.statusText);
    }

    return response; 
}