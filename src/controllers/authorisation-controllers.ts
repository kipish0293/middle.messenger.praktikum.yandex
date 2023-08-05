import AuthAPI from "../api/authorisation-api";
import { goApp, PATHS } from "../utils/routerChange";
import serializeForm from "../utils/serializeForm";
import { validatorForm } from "../utils/validators";

interface LoginFormModel {
    email: string;
    password: string;
}

interface RegFormModel {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
}

class AuthController {
    public async singup(data: EventTarget) {
        try {
            const { formData, inputElements } = serializeForm(data);
            const hasError = validatorForm(inputElements);

            if (hasError) {
                return;
            }

            const prepareData: RegFormModel = {
                email: formData.email,
                login: formData.login,
                first_name: formData.first_name,
                second_name: formData.second_name,
                phone: formData.phone,
                password: formData.password,
            };

            const res = await AuthAPI.singup(prepareData);
            const resData: Record<string, any> = res.data;

            if (resData.id) {
                goApp(PATHS.MES);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async singin(data: EventTarget) {
        try {
            const { formData, inputElements } = serializeForm(data);
            const hasError = validatorForm(inputElements);
            if (hasError) {
                return;
            }

            const res = await AuthAPI.singin(formData as LoginFormModel);

            if (res.status) {
                goApp(PATHS.MES);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async logout() {
        try {
            const res = await AuthAPI.logout();

            if (res.status) {
                goApp(PATHS.AUTH);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async user() {
        try {
            const res = await AuthAPI.user();
            //затем вынести логику в Store
            return res.data
        } catch (error) {
            console.log(error);
            return
        }
    }
}

export default new AuthController();
