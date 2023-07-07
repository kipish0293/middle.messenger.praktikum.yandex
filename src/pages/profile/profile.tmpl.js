export default `
    <div>
        <div class="back-step" id="back-step" title="{{backButtonTitle}}">
            <span class="material-icons">
                arrow_back
            </span>
        </div>
        <div class="form_offer">
            <div class="profile_form shadow-disable">
                <div class="profile_form__avatar">
                    {{{userAvatar}}}
                </div>

                <h2 class="profile_form__firstName">{{userData.first_name}}</h2>

                {{#if editDataMode}}
                    {{{editProfileForm}}}
                {{else}}
                    {{{editPasswordForm}}}
                {{/if}}

                {{#unless editMode}}
                    <div class="profile_form__footer">
                        <div>
                            <a href="" id="change-data">Изменить данные</a>
                        </div>
                        <div>
                            <a href="" id="change-password">Сменить пароль</a>
                        </div>
                        <div>
                            <a href="" id="logout" class="color-red">Выйти</a>
                        </div>
                    </div>
                {{/unless}}
            </div>
        </div>
        {{{modal}}}
    </div>
`;
