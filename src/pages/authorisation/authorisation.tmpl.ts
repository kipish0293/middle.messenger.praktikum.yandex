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
            <span class="back-to-registration">
                {{{linkButton}}}
            </span>
        </form>
    </div>
`;
