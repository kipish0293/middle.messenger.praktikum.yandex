export default `
    <div class="form_offer">
        <form id="auth-form" class="form">
            <h1 class="form_title">Вход</h1>
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            <div class="authorisation_button">
                {{{button}}}
            </div>
            <a href="" id="back-to-registration">
                Нет аккаунта?
            </a>
        </form>
        <div>
    </div>
`;
