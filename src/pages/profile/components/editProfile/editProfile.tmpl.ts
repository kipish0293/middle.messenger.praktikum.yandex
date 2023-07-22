export default `
    {{#each inputTemplate}}
        {{{this}}}
    {{/each}}
    {{#if editMode}}
        <div class="edit-form__btn">
            {{{button}}}
        </div>
    {{/if}}
`;
