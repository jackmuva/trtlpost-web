import StandardApi from "./StandardApi";

class WriterApi extends StandardApi{

    postNewWriter(writer){
        return this.post('/api/writer/new', writer).then(response => response.json());
    }
    deleteWriter(writerId){
        return this.delete(`/api/writer/${writerId}`);
    }
    getWriter(penName){
        return this.get(`/api/writer/get/${penName}`).then(response => response.json());
    }

    getLoggedInWriter(){
        return this.getWithAuth(`/api/writer/getWriter`).then(response => response.json())
    }
}
export default new WriterApi();