import { changePathName } from "./changePatrhName";

export default function () {
    localStorage.removeItem("auth");
    changePathName("");
}
