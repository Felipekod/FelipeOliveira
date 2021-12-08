import axios from 'axios';

const PRODUCT_API_REST_URL = "http://localhost:8080/api/products";

class APIService {
    
    getProducts(){
        return axios.get(PRODUCT_API_REST_URL);
    }

}

export default new APIService();