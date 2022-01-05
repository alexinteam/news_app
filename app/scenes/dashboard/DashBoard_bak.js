
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'

import * as api from "../../api";
import {addCategoryHeadlines, addHeadlines, addNews} from "../../actions";
import Article from "../../utils";

import Panel from '../../components/Panel'
import PanelItem from '../../components/PanelItem'
import * as c from "../../constants";

export default function DashBoard_bak(props) {
    const dispatch = useDispatch();
    const {navigate} = props.navigation;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    //Access Redux Store State
    const newsReducer = useSelector(({newsReducer}) => newsReducer);
    const {news} = newsReducer;

    //==================================================================================================

    let nextTimestamp = 1;


    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        getData();
    }, []);

    //==================================================================================================

    //3 - GET DATA
    async function getData() {
        setIsFetching(true);

        try {
            let data = await api.getNews();
            dispatch(addNews(data));

        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false);
            console.log(newsReducer)
        }
    }

    //
    // async function onRefresh() {
    //     setIsRefreshing(true);
    //
    //     try {
    //         let data = await api.getNews();
    //         dispatch(addNews(data));
    //     } catch (error) {
    //         alert(error.message);
    //     } finally {
    //         setIsRefreshing(false)
    //     }
    // };
    //
    // async function onLoadMore() {
    //     if (!isLoadingMore){
    //         setIsLoadingMore(true);
    //
    //         try {
    //             if (news && news.length) {
    //                 let last = news.reverse()[0];
    //                 let data = await api.getNews(last.date);
    //                 data = news.concat(data);
    //                 dispatch(addNews(data));
    //             }
    //         } catch (error) {
    //             alert(error.message);
    //         } finally {
    //             setIsLoadingMore(false)
    //         }
    //     }
    // };

    //==================================================================================================

    //4 - RENDER NEWS ITEM - A function that returns a function
    const renderItem = (size = 'small', horizontal = false, grid = false, wrapper = true) => {
        return ({item, index}) => {
            let article = new Article(item, navigate);
            return <PanelItem {...article} size={size} horizontal={horizontal} grid={grid} wrapper={wrapper}/>
        };
    };

    //==================================================================================================

    //5 - ON CTA PRESS
    const onCTAPress = (category) => navigate("Articles", {category});

    //==================================================================================================

    //6 - RENDER
    if (isFetching) return <ActivityIndicator style={{paddingVertical: 8}}/>;
    if (error){
        return (
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontSize: 16}}>
                    {`${error.message}`}
                </Text>
                <Text style={{color: "blue", fontSize: 16, padding: 8}} onPress={getData}>Tap to retry</Text>
            </View>
        );
    }

    let renderDefaultItem = renderItem();
    let renderHorizontalItem = renderItem(null, true, false, true);

    let renderGridItem = renderItem('small', false, true, false);
    let renderHorizontalGridItem = renderItem(null, true, true, false);

    let renderSportItem = renderItem('large');
    let renderTechItem = renderItem('large', false, true);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <FlatList
            data={newsReducer['news']}
            renderItem={renderItem}
            // numColumns={2}
            // initialNumToRender={10}

            // onRefresh={onRefresh}
            // refreshing={isRefreshing}

            // onEndReached={onLoadMore}
            // onEndReachedThreshold={0.5}

            // contentContainerStyle={{paddingHorizontal: 8}}
            keyExtractor={(item, index) => `${index.toString()}`}/>

        // <ScrollView
        //     style={{backgroundColor: "#fff"}}
        // >
        //     {/*<Panel title={"Business"}*/}
        //     {/*       data={business.articles.slice(0, 10)}*/}
        //     {/*       renderItem={renderDefaultItem}*/}
        //     {/*       onCTAPress={() => onCTAPress("Business")}/>*/}
        //
        //     {/*<Panel title={"Entertainment"}*/}
        //     {/*       data={entertainment.articles.slice(0, 10)}*/}
        //     {/*       renderItem={renderHorizontalItem}*/}
        //     {/*       onCTAPress={() => onCTAPress("Entertainment")}/>*/}
        //
        //     <Panel cols={1}
        //            title={"News"}
        //            data={news}
        //            renderItem={renderHorizontalGridItem}
        //            onCTAPress={() => onCTAPress("News")}/>
        //
        //     {/*<Panel cols={2}*/}
        //     {/*       title={"Health"}*/}
        //     {/*       data={health.articles.slice(0, 6)}*/}
        //     {/*       renderItem={renderGridItem}*/}
        //     {/*       showDivider={false}*/}
        //     {/*       onCTAPress={() => onCTAPress("Health")}/>*/}
        //
        //     {/*<Panel title={"Science"}*/}
        //     {/*       data={science.articles.slice(0, 10)}*/}
        //     {/*       renderItem={renderDefaultItem}*/}
        //     {/*       onCTAPress={() => onCTAPress("Science")}/>*/}
        //
        //     {/*<Panel title={"Sports"}*/}
        //     {/*       data={sports.articles.slice(0, 10)}*/}
        //     {/*       renderItem={renderSportItem}*/}
        //     {/*       onCTAPress={() => onCTAPress("Sports")}/>*/}
        //
        //     {/*<Panel cols={1}*/}
        //     {/*       title={"Technology"}*/}
        //     {/*       data={technology.articles.slice(0, 6)}*/}
        //     {/*       renderItem={renderTechItem}*/}
        //     {/*       showDivider={false}*/}
        //     {/*       onCTAPress={() => onCTAPress("Technology")}/>*/}
        // </ScrollView>
    );
};


DashBoard_bak.navigationOptions = ({navigation}) => {
    return {title: `MeNews`}
};