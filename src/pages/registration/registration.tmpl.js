export default `
    <div class="form_offer">
        <form id="reg-form" class="form">
            <h1 class="form_title">Регистрация</h1>
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            <div class="registration_button">
                {{{button}}}
            </div>
            <a href="" id="back-to-login">Войти</a>
        </form>
    </div>
`;
