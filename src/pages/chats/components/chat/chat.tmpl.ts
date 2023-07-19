export default `
    {{#if chatId}}
        {{#each messages}}
            {{{this}}}
        {{/each}}
    {{else}}
        <p class="chat_offer__no-select">Выберите чат, чтобы написать сообщение</p>
    {{/if}}
`;
