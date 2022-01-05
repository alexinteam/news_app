import React from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import * as colors from '../../constants/colors';
import { getFromNow, getShortDate } from '../../utils/date';

import { WebView } from 'react-native-webview';

export default function Article(props) {
    const {navigation} = props;
    const article = navigation.getParam("article");

    //==================================================================================================

    console.log(JSON.stringify(article));
    return (
        // <View style={styles.container}>
        //
        //     <Image source={{ uri: article.urlToImage }} style={styles.image} />
        //     <View style={styles.contentContainer}>
        //         <Title style={styles.text}>{article.title}</Title>
        //         <Text>
        //             {article.content}
        //         </Text>
        //     </View>
        //
        // </View>

        <View style={styles.container}>
            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
                <Image style={styles.pictureTop} source={{ uri: article.urlToImage }} />
            </View>
            <Text style={styles.readingTitle}>BASED ON YOUR READING HISTORY</Text>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.push('Details', { ...article })}>
                        <Text style={styles.mainTitle}>{article.title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.content}>{article.content}</Text>
                </View>
            </View>
            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.primary, fontSize: 15, fontWeight: '600' }}>{article.author}</Text>
                    <Text style={{ color: colors.gray_200, fontSize: 13 }}>{getShortDate(article.publishedAt)} - {getFromNow(article.publishedAt)} read</Text>
                </View>
            </View>
        </View>


        // <WebView source={{ uri: article.url }}
        //          startInLoadingState={true}
        //          onError={() => alert("Failed to load article.")}
        //          renderLoading={() => <ActivityIndicator style={{paddingVertical: 8}}/>}/>
    );
};

Article.navigationOptions = ({navigation}) => {
    return {
        title: `${navigation.getParam('title')}`,
        headerRight: null
    }
};

const win = Dimensions.get('window');
const ratio = win.width/541;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        borderBottomColor: colors.gray_100,
        borderBottomWidth: 1
    },
    readingTitle: {
        color: colors.gray_200,
        fontSize: 13
    },
    mainTitle: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 17
    },
    content: {
        color: colors.primary,
        fontSize: 14
    },
    picture: {
        height: 80,
        width: 80
    },
    pictureTop: {
        flex: 1,
        width: win.width,
        height: 362 * ratio,
    }
});