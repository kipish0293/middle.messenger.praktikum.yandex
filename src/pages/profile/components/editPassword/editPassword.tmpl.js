export default `
    <form id="profile-pass-form" class="">
        {{#each inputs}}
            {{{this}}}
        {{/each}}
        <div class="edit-form__btn">
            <div>
                {{{button}}}
            </div>
        </div>
    </form>
`;
