export default `
    <form id="profile-data-form" class="edit-form">
        {{#each inputs}}
            {{{this}}}
        {{/each}}
        {{#if editMode}}
            <div class="edit-form__btn">
                {{{button}}}
            </div>
        {{/if}}
    </form>
`;
