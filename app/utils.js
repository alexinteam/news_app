import moment from "moment";

export default class Article {
    constructor(item, navigate){
        this.context = item.subTitle;
        this.title = item.title;
        this.subtext = item.dateFormatted;

        if (item.imageUrl600x400) this.image = item.imageUrl600x400;

        if (navigate) this.onPress = () => navigate("Article", {title: item.title, article: item});
    }
}