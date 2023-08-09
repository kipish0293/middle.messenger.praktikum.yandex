export default `
    {{{input}}}
    <ul class="user-list">
        {{#each userList}}
            {{{this}}}
        {{/each}}
    </ul>
    {{{button}}}
`;
