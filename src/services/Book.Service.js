import axios from 'axios';

const BOOK_API_BASE_URL = 'http://localhost:8080/Book';

class Bookservice {

    getAllBook() {
        return axios.get(BOOK_API_BASE_URL);
    }
    createBook(product){
        return axios.post(BOOK_API_BASE_URL , product);
    }
    getBookById(BookId) {
        return axios.get(BOOK_API_BASE_URL + '/' + BookId);
    }
    deleteBookById(BookId) {
        return axios.delete(BOOK_API_BASE_URL + '/' + BookId);
    }
    updateBookById(BookBody) {
        return axios.put(BOOK_API_BASE_URL + '/' + BookBody.id,BookBody );
    }
    getAllBookInPage(pageNo,pageSize,sortBy){
        return axios.get(BOOK_API_BASE_URL + '/' + 'page?pageNo='+pageNo+'&pageSize='+pageSize+'&sortBy='+sortBy );
    }
    searchedBook(Searched,pageNo){
        return axios.get(BOOK_API_BASE_URL  + '/page/serachedPages?searched='+Searched+'&pageNo='+pageNo+'&pageSize=3' );
    }
   
}

export default new Bookservice();
