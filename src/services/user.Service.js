import axios from 'axios';
import authHeader from './auth.header';


const API_URL = 'http://localhost:8080/api/users';

class userService {
    getAllUsers() {
        return axios.get(API_URL, { headers:authHeader() });
    }
    createUser1(User1){
        return axios.post(API_URL, User1,{ headers:authHeader() });
    }

    getUserById(id) {
        return axios.get(API_URL + '/' + id,{ headers:authHeader() });
    }

    deleteUserById(id) {
        return axios.delete(API_URL + '/' + id,{headers:authHeader() });
    }

    updateUser(UserBody) {
        return axios.put(API_URL + '/' + UserBody.id,UserBody,{headers:authHeader() });
    }

    getAllUsersInPage(pageNo,pageSize) {
        return axios.get(API_URL + '/page?pageNo='+pageNo+'&pageSize'+pageSize,{headers:authHeader() });
    }
        

    searchUser(searched,pageNo){
        return axios.get(API_URL + '/page/serachedPages?searched=' + searched+'&pageNo='+pageNo+'&pageSize=5',{headers:authHeader() });
    }
    updateEmail(id,email) {
        return axios.put(API_URL + '/email/'+id + '?email='+ email ,{headers:authHeader() });
        
    }
    updateFullname(id,name) {
        return axios.put(API_URL + '/name/'+id + '?name='+ name ,{headers:authHeader() });
        
    }
    updatePhoneNumber(id,phonenumber) {
        return axios.put(API_URL + '/phonenumber/'+id + '?phonenumber='+ phonenumber ,{headers:authHeader() });
}

}

export default new userService();
	