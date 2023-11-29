import StandardApi from "./StandardApi";

class SeriesApi extends StandardApi{
    postSeries(series){
        return this.postWithAuth('/api/series/new', series);
    }

    putSeries(series){
        return this.putWithAuth('/api/series/update', series).then(response => response.json());
    }
    getSeriesById(id){
        return this.get(`/api/series/${id}`).then(response => response.json());
    }
    deleteSeries(seriesId){
        return this.deleteWithAuth(`/api/series/delete/${seriesId}`);
    }
    getNewestSeries(page){
        return this.get(`/api/series/getNewest?page=${page}`).then(response => response.json());
    }

    getSeriesByWriter(writer){
        return this.get(`/api/series/writer/${writer}`).then(response => response.json());
    }
    getSeriesByTag(tag){
        return this.get(`/api/series/tag/${tag}`).then(response => response.json());
    }
    getSeriesByKeyword(keyword, page){
        return this.get(`/api/series/search/${keyword}?page=${page}`).then(response => response.json());
    }
}
export default new SeriesApi();