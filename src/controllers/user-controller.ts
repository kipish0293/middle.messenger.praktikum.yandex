import UserAPI from "../api/user-api";
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
    oldPassword: string;
    newPassword: string;
}

class UserController {
    public async profile(data: EventTarget) {
        try {
            const { formData, inputElements } = serializeForm(data);
            const hasError = validatorForm(inputElements);
            if (hasError) {
                return;
            }

            await UserAPI.profile(formData as IProfile);
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
                newPassword: formData.newPassword,
            };

            await UserAPI.password(prepareData);
        } catch (error) {
            console.log(error);
        }
    }

    public async avatar(data: FormData) {
        try {
            const res = await UserAPI.avatar(data);
            return res.data;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    public async search(data: Record<string, any>) {
        try {
            const res = await UserAPI.search(data);
            return res.data;
        } catch (error) {
            console.log(error);
            return;
        }
    }
}

export default new UserController();
