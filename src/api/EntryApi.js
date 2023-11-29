import StandardApi from "./StandardApi";

class EntryApi extends StandardApi{
    postNewEntry(entry){
        return this.postWithAuth('/api/entry/new', entry).then(response => response.json());
    }

    updateEntry(entry){
        return this.putWithAuth('/api/entry/update', entry).then(response => response.json());
    }
    deleteEntry(id){
        return this.deleteWithAuth(`/api/entry/delete/${id}`);
    }
    getEntriesBySeriesId(id){
        return this.get(`/api/entry/getBySeries/${id}`).then(response => response.json());
    }
}
export default new EntryApi();