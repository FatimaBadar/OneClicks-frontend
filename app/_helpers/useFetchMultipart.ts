// import { useRouter } from "next/navigation";

const useFetchMultipart = () => {
    // const router = useRouter();
  
    return {
      get: request("GET"),
      post: request("POST"),
      put: request("PUT"),
      delete: request("DELETE"),
    };
  
    function request(method: string) {
      return (url: string, body?: any) => {
        const requestOptions: any = {
          method,
          // credentials: "include", // Include credentials (e.g., cookies) in the request
        };
        if (body) {
          requestOptions.headers = { "Content-Type": "multipart/form-data" };
          // requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions);
      };
    }
  
  };
  export default useFetchMultipart;
  