import React, {useEffect, useState} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'

import * as api from "../../api";
import * as c from "../../constants";
import {addCategoryHeadlines, addNews} from "../../actions";
import Article from "../../utils";

import PanelItem from '../../components/PanelItem'

export default function Articles(props) {
    const dispatch = useDispatch();
    const {navigation} = props;
    const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    //Access Redux Store State
    const newsReducer = useSelector(({newsReducer}) => newsReducer);

    let articles = newsReducer['news'];

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setIsFetching(true);

        try {
            let timestamp = Math.round(Date.now() / 1000);
            let data = await api.getNews(timestamp);
            dispatch(addNews(data, timestamp));
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }
    //==================================================================================================

    //2 - ON LOAD MORE
    async function onLoadMore() {
        if (!isLoadingMore){
            setIsLoadingMore(true);
            try {
                let last = newsReducer['news'].reverse()[0];
                let data = await api.getNews(last.date);
                data = newsReducer['news'].concat(data)
                dispatch(addNews(data, last.date))
            } catch (error) {
                alert(error.message);
            } finally {
                setIsLoadingMore(false)
                console.log(newsReducer['news'].length)
            }
        }
    }

    //==================================================================================================

    //3 - RENDER NEWS ITEM
    const renderItem = ({item, index}) => {
        let article = new Article(item, navigate);

        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 6}}>
                <PanelItem {...article}/>
            </View>
        );
    };

    //==================================================================================================

    //4 - RENDER FOOTER
    const renderFooter = () => {
        let footerStyle ={
            position: 'relative',
            paddingVertical: 20,
            marginTop: 10,
            marginBottom: 10
        };

        return (
            <View style={footerStyle}>
                <ActivityIndicator/>
            </View>
        );
    };

    //==================================================================================================

    //5 - RENDER
    return (
        <FlatList
            data={newsReducer['news']}
            renderItem={renderItem}
            numColumns={1}
            initialNumToRender={10}
            removeClippedSubviews={true}

            onRefresh={getData}
            refreshing={isRefreshing}

            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}

            contentContainerStyle={{paddingHorizontal: 8}}
            keyExtractor={(item, index) => `${index.toString()}`}/>
    );
};

Articles.navigationOptions = ({navigation}) => {
    return {
        title: `${navigation.getParam('category')}`
    }
};