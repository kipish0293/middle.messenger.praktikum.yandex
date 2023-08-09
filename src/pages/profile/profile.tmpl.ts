export default `
    {{{backStep}}}
    <div class="form_offer">
        <div class="profile_form shadow-disable">
            <div class="profile_form__avatar">
                {{{userAvatar}}}
            </div>

            <h2 class="profile_form__firstName">{{userData.first_name}}</h2>

            {{{editDataForm}}}
            {{{editPassForm}}}

            <div class="profile_form__footer">
                <span class="profile_form__item">
                    {{{changeUserData}}}
                </span>
                <span class="profile_form__item">
                    {{{changeUserPass}}}
                </span>
                <span class="profile_form__item profile_form__item_red">
                    {{{logout}}}
                </span>
            </div>
        </div>
    </div>
    {{{modal}}}
`;
