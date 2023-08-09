export default `
    <ul class="user-list">
        {{#each userList}}
            {{{this}}}
        {{/each}}
    </ul>
    {{{button}}}
`;
