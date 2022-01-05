import axios from 'axios';

import * as c from './constants';

export async function getHeadlines(country = "us", page = 1){
    try{
        let requests = [];
        c.CATEGORIES.map((category) => {
            let url =  `${c.HEADLINES}&country=${country}&category=${category.toLowerCase()}`;
            requests.push(axios.get(url))
        });

        let response = await Promise.all(requests);
        response.map((resp, idx) => {
            let {articles, totalResults} = resp.data;

            response[idx] = {articles, totalResults};
        });

        let [business, entertainment, general, health, science, sports, technology] = response;

        return {business, entertainment, general, health, science, sports, technology};

    }catch (e) {
        throw new Error(e);
    }
}

export async function getHeadlinesByCategory(category, page=1, country = "us"){
    try{
        const url = `${c.HEADLINES}&category=${category}&page=${page}&country=${country}`;
        let res = await axios.get(url);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}

export async function search(query, cancelToken){
    try{
        const url = `${c.SEARCH}&q=${query.toLowerCase()}`;
        let res = await axios.get(url, {
            cancelToken: cancelToken.token,
        });

        return res.data;

    }catch (error) {
        let err = new Error(error.message);
        err.isCancel = (axios.isCancel(error));

        throw err;
    }
}


///// rzn

export async function getNews(timestamp = undefined){
    try{
        if(timestamp === undefined) {
            timestamp = Math.round(Date.now() / 1000);
        }
        let news = await axios.get('https://api.rzn.info/v1/news' +  '?timestamp='  + timestamp.toString());
        return news.data
    } catch (e) {
        throw new Error(e);
    }
}