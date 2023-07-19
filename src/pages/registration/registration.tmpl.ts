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
            <span class="back-to-authorisation">
                {{{linkButton}}}
            </span>
        </form>
    </div>
`;
