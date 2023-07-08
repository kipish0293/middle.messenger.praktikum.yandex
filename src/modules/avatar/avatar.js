import "./avatar.scss";
import Handlebars from "handlebars";
import tmpl from "./avatar.tmpl";

export function avatar({ size, url, canChangeAvatar = false }) {
    const template = Handlebars.compile(tmpl);
    const sizeSmall = "width: 47px; height: 47px;";
    const sizeMedium = "width: 130px; height: 130px;";
    const calculatedSize = () => {
        return size && size === "medium" ? sizeMedium : sizeSmall;
    };
    return template({
        size: calculatedSize(),
        url: "https://i.stack.imgur.com/WXyZl.jpg",
        canChangeAvatar,
    });
}
