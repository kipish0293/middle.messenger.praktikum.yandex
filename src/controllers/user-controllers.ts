import UserAPI from "../api/user-api";
// import { goApp, PATHS } from "../utils/routerChange";
import serializeForm from "../utils/serializeForm";
import { validatorForm } from "../utils/validators";

interface IProfile {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

interface IPassword {
    oldPassword: string,
    newPassword: string
}

class UserController {
    public async profile(data: EventTarget) {
        try {
            const { formData, inputElements } = serializeForm(data);
            const hasError = validatorForm(inputElements);
            if (hasError) {
                return;
            }

            const res = await UserAPI.profile(formData as IProfile);
            console.log(res)

            // if (res.status) {
            //     goApp(PATHS.MES);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    public async password(data: EventTarget) {
        try {
            const { formData, inputElements } = serializeForm(data);
            const hasError = validatorForm(inputElements);
            if (hasError) {
                return;
            }

            const prepareData: IPassword = {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            };

            const res = await UserAPI.password(prepareData);
            console.log(res)

            // if (res.status) {
            //     goApp(PATHS.MES);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    public async avatar(data: FormData) {
        try {
            const res = await UserAPI.avatar(data);
            return res.data
        } catch (error) {
            console.log(error);
            return
        }
    }
}

export default new UserController();
