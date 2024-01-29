import StandardApi from "./StandardApi";

class EditorJsApi extends StandardApi{
    getSaveImageUrl(){
        return this.retrieveApiUrl().concat('/api/image/save');
    }

    getLinkUrl(){
        return this.retrieveApiUrl().concat('/api/fetchUrl');
    }
}
export default new EditorJsApi();